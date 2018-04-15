import * as Koa from 'koa';
import * as bodyParser from "koa-bodyparser";
import * as session from 'koa-session';
import * as Router from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as StaticCache from 'koa-static-cache';
import * as views from 'koa-views';


import { Middleware } from 'koa-compose';
import { Server } from 'net';
import { IConfigOption, IMapOption, ISessionConfig, IStaticConfig, IViewsConfig } from '../summery';
import { getConfigFile } from './configLoader';
import { IMiddleware } from 'koa-router';
import { isEmptyObject, loadAllScriptFileOnDir, isObject } from '../util/util';
import { resolve } from 'path';
import { routerMap, Controller, Get, Post, Auth, RequestMapping, Required } from './decorators';
import { RouterMapping } from './route';
import DBHelper from './dbHelper';

export class Summery {

	private app: Koa = new Koa();
	private routerMap = routerMap;
	private RouterMapping: RouterMapping;
	private db:DBHelper;
	public config: IConfigOption;
	constructor(configFileName: IConfigOption | string) {
		//加载配置文件
		this.config = isObject(configFileName) ? 
									<IConfigOption>configFileName : 
									getConfigFile(<string>configFileName);
		this.RouterMapping = new RouterMapping(this.app);

		this.init();


	}
	private init() {
		this.app.use(bodyParser());

		//配置session
		if (this.has('session') && !isEmptyObject(<object>this.config.session)) {
			this.initSession();
		}
		// 配置静态文件中间件
		if (this.has('static') && !isEmptyObject(<object>this.config.static)) {
			this.initStatic();
		}
		//配置views 视图层
		if (this.has('views') && !isEmptyObject(<object>this.config.views)) {
			this.initViews();
		}
		//配置数据库层
		if(this.has('database')&& !isEmptyObject(<object>this.config.database)){
		this.db=new DBHelper(this.config.database);
		}
		if (this.has('controller')) {
			//  this.config.controller;
			loadAllScriptFileOnDir(<string>this.config.controller);

			this.RouterMapping.init();
			this.routerMap = routerMap;
		}
	}
	private getDirPath(dirName: string): string {
		return resolve(process.cwd(), `./${dirName}`);
	}
	private initStatic() {
		const staticConfig = <IStaticConfig>this.config.static;
		if (staticConfig.cache) {
			this.use(StaticCache(staticConfig.config));
		} else {
			this.use(KoaStatic(this.getDirPath(<string>staticConfig.config.dir)));
		}
	}
	private initSession() {
		const sessionConfig = <ISessionConfig>this.config.session;
		if (!sessionConfig.keys) {
			throw "配置session必须要有keys"
		}
		this.app.keys = sessionConfig.keys;
		this.app.use(session(sessionConfig.option, this.app));
	}
	private initViews() {
		const viewsConfig = <IViewsConfig>this.config.views;
		this.use(views(this.getDirPath(viewsConfig.dirname), viewsConfig.config));
	}

	private has(key: string) {
		return !!this.config[key];
	}




	public use(middle: Middleware<Koa.Context>): Koa {
		return this.app.use(middle);
	}
	public start(...args: any[]): Server {
		return this.app.listen(...arguments);
	}
}

