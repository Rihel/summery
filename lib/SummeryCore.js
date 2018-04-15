"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const KoaStatic = require("koa-static");
const StaticCache = require("koa-static-cache");
const views = require("koa-views");
const configLoader_1 = require("./configLoader");
const util_1 = require("../util/util");
const path_1 = require("path");
const decorators_1 = require("./decorators");
const route_1 = require("./route");
class Summery {
    constructor(configFileName = "project.config.json") {
        this.app = new Koa();
        this.routerMap = decorators_1.routerMap;
        //加载配置文件
        this.config = configLoader_1.getConfigFile(configFileName);
        this.RouterMapping = new route_1.RouterMapping(this.app);
        this.init();
    }
    init() {
        this.app.use(bodyParser());
        //配置session
        if (this.has('session') && !util_1.isEmptyObject(this.config.session)) {
            this.initSession();
        }
        // 配置静态文件中间件
        if (this.has('static') && !util_1.isEmptyObject(this.config.static)) {
            this.initStatic();
        }
        //配置views 视图层
        if (this.has('views') && !util_1.isEmptyObject(this.config.views)) {
            this.initViews();
        }
        if (this.has('controller')) {
            //  this.config.controller;
            util_1.loadAllScriptFileOnDir(this.config.controller);
            this.RouterMapping.init();
            this.routerMap = decorators_1.routerMap;
        }
    }
    getDirPath(dirName) {
        return path_1.resolve(process.cwd(), `./${dirName}`);
    }
    initStatic() {
        const staticConfig = this.config.static;
        if (staticConfig.cache) {
            this.use(StaticCache(staticConfig.config));
        }
        else {
            this.use(KoaStatic(this.getDirPath(staticConfig.config.dir)));
        }
    }
    initSession() {
        const sessionConfig = this.config.session;
        if (!sessionConfig.keys) {
            throw "配置session必须要有keys";
        }
        this.app.keys = sessionConfig.keys;
        this.app.use(session(sessionConfig.option, this.app));
    }
    initViews() {
        const viewsConfig = this.config.views;
        this.use(views(this.getDirPath(viewsConfig.dirname), viewsConfig.config));
    }
    has(key) {
        return !!this.config[key];
    }
    use(middle) {
        return this.app.use(middle);
    }
    start(...args) {
        return this.app.listen(...arguments);
    }
}
exports.Summery = Summery;
