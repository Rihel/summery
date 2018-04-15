import * as Koa from 'koa';
import * as Router from 'koa-router';
import {Session} from 'koa-session';
/**
 * 构造函数类型
 */
declare type Constructor = {
  new(...args : any[]): {}
}
declare type Koa = Koa;

/**
 * 路由参数
 */
interface IRequestMappingOption {
  method : string,
  path : string
}
/**
 * 路由参数
 */
interface IRouter extends Router {
  [key : string] : any
}
interface IMapOption extends IRequestMappingOption {
  target : any
}

interface IObject {
  [key : string] : any;
}

/**
 * session配置
 */
interface ISessionConfig {
  keys : string[],
  option : Session
}

/**
 * 模板引擎配置
 */
interface IViewsConfig {
  dirname : string,
  config : {
    extension?: string,

    options?: any,

    map?: any,

    engineSource?: any
  }
}





interface IStaticConfig {
  cache?: boolean;
  config : {
    dir?: string;
    maxAge?: number;
    cacheControl?: string;
    buffer?: boolean;
    gzip?: boolean;
    usePrecompiledGzip?: boolean;
    alias?: object;
    prefix?: string;
    dynamic?: string;
  };
}

interface IConfigOption extends IObject {
  database?: {
    host: string,
    password: string,
    user: string,
    database: string
  };
  controller?: string;
  views?:IViewsConfig,
  static?: IStaticConfig,
  session?: ISessionConfig
}
