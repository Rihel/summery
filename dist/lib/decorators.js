"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverResponse_1 = require("./serverResponse");
const util_1 = require("../util/util");
exports.routerMap = new Map();
exports.Controller = (prefix) => {
    return (target) => {
        target.prototype.prefix = prefix;
        return class extends target {
        };
    };
};
exports.RequestMapping = (option) => {
    return (target, property, descriptor) => {
        let controller = descriptor.value;
        console.log(target);
        option.path = util_1.normalPath(option.path);
        exports.routerMap.set(Object.assign({}, option, { target }), controller);
        return descriptor;
    };
};
exports.Get = (path) => {
    return exports.RequestMapping({ path, method: 'get' });
};
exports.Post = (path) => {
    return exports.RequestMapping({ path, method: 'post' });
};
exports.Auth = (target, methodName, descriptor) => {
    let old = descriptor.value;
    descriptor.value = function (ctx, next) {
        if (!ctx.session.user) {
            return (ctx.body = serverResponse_1.createLoginError());
        }
    };
    return descriptor;
};
/**
 *  Required({
 *    query:['userId'], /api/aaa?a=1  ===> {a:1}
 *    body:['userId'], //post请求参数  ctx.request.body
 *    params:['userId'] /usre/:userid
 *  })
 */
exports.Required = (requiredOption) => {
    return (target, methodName, descriptor) => {
        let old = descriptor.value;
        descriptor.value = async function (ctx, next) {
            let query = ctx.query;
            let params = ctx.params;
            let body = ctx.request.body;
            let err = []; //存储错误信息
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
                        if (!objectKeys.includes(filed)) {
                            err.push(filed);
                        }
                    }
                    else {
                        objectKeys = Object.keys(ctx[key]);
                        if (!objectKeys.includes(filed)) {
                            err.push(filed);
                        }
                    }
                }
            }
            if (err.length !== 0) {
                return (ctx.body = serverResponse_1.createErrorByStatusMessage(serverResponse_1.ResponseStatus.MISS_ARG, `参数：${err.join(',')}缺失`));
            }
            await next();
            return old(...arguments);
        };
        return descriptor;
    };
};
