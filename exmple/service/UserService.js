import { Table, Inject, ServerResponse } from '../../';
import DBHelper from '../../lib/dbHelper';
import { createSuccess,createSuccessByData } from '../../lib/serverResponse';







@Inject({
	conn:new DBHelper(),
	tableName:'user'
})
export default class UserService{
	async	getAllUser(){
		const results =await	this.conn.query('select * from '+this.tableName);
		console.log('service ',results);
		return createSuccessByData(results);
	}
}