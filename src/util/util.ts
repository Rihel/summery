import {IObject} from "../summery";
import { resolve } from "path";
import { readdirSync } from "fs";

const ops = Object.prototype.toString;

export const type = (data : any = {}, t : string) : boolean => {
  return ops
    .call(data)
    .match(/\[object\s(.+)\]/)[1]
    .toLowerCase() === t;
}

export const isObject = (data : any) : boolean => {
  return type(data, 'object');
}

export const isArray = (data : any) : boolean => {
  return type(data, 'array');
}

export const merge = (target : IObject, ...args : IObject[]):IObject => {
  args.forEach(object => {
    for (const key in object) {
      const value = object[key];
      if (isObject(value)) {
        target[key] = merge({}, value);
      } else if (isArray(value)) {
        target[key] = merge([], value);
      } else {
        target[key] = value;
      }

    }
  })
  return target;
}


export const isEmptyObject =(data:object)=>{
  return Object.keys(data).length === 0;
}

export function normalPath(path:string):string{
	return path.startsWith('/')?path :`/${path}`;
}


export function loadAllScriptFileOnDir(dirName:string):void{
	const dirPath = resolve(process.cwd(),`./${dirName}`);
	const files = readdirSync(dirPath);
	files.forEach((fileName:string)=>{
		let filePath = resolve(dirPath,`./${fileName}`);
		if(/\.(js)/.test(filePath)){
			require(filePath);
		}
	})
}


