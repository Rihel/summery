import * as mysql from "mysql";
import { getConfigFile } from "./configLoader";



let connection:mysql.Connection;

export default class DBHelper{
	constructor(config?:mysql.ConnectionConfig){
		if(!connection){
			connection = mysql.createConnection(config);
			connection.connect((err)=>{
				if(err) throw err;
				console.log('...数据库已连接')
			})
		}
	}
	public query<T>(sql:string,param:any[]):Promise<T>{
		return new Promise((resolve, reject) => {
			connection.query(sql,param,(err,results)=>{
				if(err) reject(err);
				resolve(results);
			});
		});
	}
}