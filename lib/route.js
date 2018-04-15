"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../lib/decorators");
const Router = require("koa-router");
const util_1 = require("../util/util");
class RouterMapping {
    constructor(app, sever) {
        this.router = new Router();
        this.app = app;
        this.server = this.server;
    }
    init() {
        for (const option of decorators_1.routerMap.keys()) {
            let prefix = option.target.prefix;
            let path = option.path;
            let requestPath = util_1.normalPath(prefix + path);
            let controller = decorators_1.routerMap.get(option);
            let method = option.method;
            this.router[method](requestPath, controller);
        }
        this.app.use(this.router.routes())
            .use(this.router.allowedMethods());
    }
}
exports.RouterMapping = RouterMapping;
