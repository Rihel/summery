import * as Koa from 'koa';
import * as Router from 'koa-router';
import {Session} from 'koa-session';

declare type Constructor = {
  new(...args : any[]): {}
}
declare type Koa = Koa;

interface IRequestMappingOption {
  method : string,
  path : string
}
interface IRouter extends Router {
  [key : string] : any
}
interface IMapOption extends IRequestMappingOption {
  target : any
}

interface IObject {
  [key : string] : any;
}
interface ISessionConfig {
  keys : string[],
  option : Session
}

interface IViewsConfig {
  dirname : string,
  config : {
    extension?: string,

    options?: any,

    map?: any,

    engineSource?: any
  }
}

declare function staticCache(dir : string, option : ISessionConfig) : Koa;

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
    url: string,
    password: string,
    username: string,
    database: string
  };
  controller?: string;
  views?:IViewsConfig,
  static?: IStaticConfig,
  session?: ISessionConfig
}
