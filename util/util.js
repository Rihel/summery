"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const ops = Object.prototype.toString;
exports.type = (data = {}, t) => {
    // console.log(data);
    return ops
        .call(data)
        .match(/\[object\s(.+)\]/)[1]
        .toLowerCase() === t;
};
exports.isObject = (data) => {
    return exports.type(data, 'object');
};
exports.isArray = (data) => {
    return exports.type(data, 'array');
};
exports.merge = (target, ...args) => {
    args.forEach(object => {
        for (const key in object) {
            const value = object[key];
            if (exports.isObject(value)) {
                target[key] = exports.merge({}, value);
            }
            else if (exports.isArray(value)) {
                target[key] = exports.merge([], value);
            }
            else {
                target[key] = value;
            }
        }
    });
    return target;
};
exports.isEmptyObject = (data) => {
    return Object.keys(data).length === 0;
};
function normalPath(path) {
    return path.startsWith('/') ? path : `/${path}`;
}
exports.normalPath = normalPath;
function loadAllScriptFileOnDir(dirName) {
    const dirPath = path_1.resolve(process.cwd(), `./${dirName}`);
    const files = fs_1.readdirSync(dirPath);
    const modules = [];
    files.forEach((fileName) => {
        let filePath = path_1.resolve(dirPath, `./${fileName}`);
        if (/\.(js)/.test(filePath)) {
            require(filePath);
        }
    });
    return modules;
}
exports.loadAllScriptFileOnDir = loadAllScriptFileOnDir;
