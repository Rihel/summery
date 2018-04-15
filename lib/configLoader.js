"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const util_1 = require("../util/util");
const defaultOption = {
    controllerDirName: 'controller',
};
let instance;
class ConfigLoder {
    constructor(configFileName = 'project.config.json') {
        //项目根目录路径
        this.rootDirPath = process.cwd();
        this.configFileName = configFileName;
        this.init();
    }
    init() {
        //拼接文件路径
        const configFilePath = path_1.resolve(this.rootDirPath, `./${this.configFileName}`);
        const file = fs_1.readFileSync(configFilePath);
        const userOption = JSON.parse(file.toString());
        instance = util_1.merge(defaultOption, userOption);
    }
}
exports.getConfigFile = (configFileName) => {
    if (instance == null) {
        new ConfigLoder(configFileName);
    }
    return instance;
};
