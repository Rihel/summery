import { routerMap } from "../lib/decorators";
import  * as Router from 'koa-router';
import { Koa, IRouter } from "../summery";
import { loadAllScriptFileOnDir, normalPath } from "../util/util";
export class RouterMapping{
	private router:IRouter = new Router();
  private app:Koa;
	constructor(app:Koa){
		this.app=app;
	}
	public init(){
		for (const option of routerMap.keys()) {
			let prefix = option.target.prefix;
      let path = option.path;
			let requestPath = normalPath(prefix+path);
			let controller = routerMap.get(option);
			let method = option.method;
      this.router[method](requestPath,controller);
		}
		this.app.use(this.router.routes())
		.use(this.router.allowedMethods());
	}
}

