import {resolve} from "path";
import {readFileSync} from "fs";
import {IConfigOption} from '../summery';
import {merge} from "../util/util";

const defaultOption : IConfigOption = {
  controllerDirName: 'controller',
}
let instance:IConfigOption;
class ConfigLoder {
  private rootDirPath : string;
  private configFileName : string;
  constructor(configFileName : string = 'project.config.json') {
    //项目根目录路径
    this.rootDirPath = process.cwd();
    this.configFileName = configFileName;
    this.init();
  }
  private init() {
    //拼接文件路径
    const configFilePath = resolve(this.rootDirPath, `./${this.configFileName}`);
    const file = readFileSync(configFilePath);
    const userOption = JSON.parse(file.toString());
    instance =<IConfigOption> merge(defaultOption, userOption);
  }
}

export const getConfigFile=(configFileName:string):IConfigOption=>{
  if(instance==null){
    new ConfigLoder(configFileName);
  }
  return instance;
}


