import {Constructor, IRequestMappingOption, IMapOption} from "../summery";
import {IMiddleware} from "koa-router";
import {normalize} from "path";
import {Context} from "koa";
import {createLoginError, createErrorByMessage, createErrorByStatusMessage, ResponseStatus} from "./serverResponse";
import {normalPath} from "../util/util";

export const routerMap = new Map < IMapOption,
  IMiddleware > ();

export const Controller = (prefix : string) => {
  return (target : Constructor) : any => {
    target.prototype.prefix = prefix;
    return class extends target {}
  }
}

export const RequestMapping = (option : IRequestMappingOption) => {
  return (target : any, property : string, descriptor : PropertyDescriptor) : any => {
		let controller = descriptor.value;
		console.log( target )
    option.path = normalPath(option.path);
    routerMap.set({
      ...option,
      target
    }, controller);
    return descriptor;
  }
}

export const Get = (path : string) => {
  return RequestMapping({path, method: 'get'})
}

export const Post = (path : string) => {
  return RequestMapping({path, method: 'post'})
}

export const Auth = (target : any, methodName : string, descriptor : PropertyDescriptor) => {
  let old = descriptor.value;
  descriptor.value = function (ctx : Context, next : () => Promise < any >) : any {
    if(!ctx.session.user) {
      return (ctx.body = createLoginError());
    }
  };
  return descriptor;
}

interface RequiredOption {
  [key : string] : any[];
}
/**
 *  Required({
 *    query:['userId'], /api/aaa?a=1  ===> {a:1}
 *    body:['userId'], //post请求参数  ctx.request.body
 *    params:['userId'] /usre/:userid
 *  })
 */
export const Required = (requiredOption : RequiredOption) => {
  return (target : any, methodName : string, descriptor : PropertyDescriptor):any => {
    let old = descriptor.value;
    descriptor.value = async function (ctx : Context, next : () => Promise < any >) : Promise<any> {
      let query = ctx.query;
      let params = ctx.params;
      let body = ctx.request.body;
      let err = [] ;//存储错误信息
      //遍历检查
      for (let key in requiredOption) {
        let flieds = requiredOption[key];
        let objectKeys;
        for (let i = 0; i < flieds.length; i++) {
          let filed = flieds[i];
          /*
            检查数组中的key是否在对象中
          */
          if (key === 'body') {
            objectKeys = Object.keys(body);
            if(!objectKeys.includes(filed)){
             err.push(filed);
            }
          } else {
            objectKeys = Object.keys(ctx[key]);
            if(!objectKeys.includes(filed)){
               err.push(filed);
            }
          }
        }
      }
      if(err.length!==0){
        return (
          ctx.body=createErrorByStatusMessage(ResponseStatus.MISS_ARG,`参数：${err.join(',')}缺失`)
        );
      }
      await next();
      return old(...arguments);
    }
    return descriptor;
  }
}