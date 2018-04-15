import { Summery } from '../index';

const app = new Summery({
	controller:'exmple/controller',
	session:{
		keys:['summery'],
		config:{
			maxAge:60000,
			key:"summery"
		}
	},
	database:{
		host:"localhost",
		user:'root',
		password:'1234',
		database:'xxxxxx'
	}
});



app.start(3000)
