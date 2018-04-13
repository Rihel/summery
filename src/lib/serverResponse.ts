
interface IServerResponse<DataType>{
	 msg?:string;
	 status:number;
	 data?:DataType;
}

export enum ResponseStatus{
	SUCCESS=0,
	ERROR=1,
	NEED_LOGIN=10,
	MISS_ARG = 20
}

class ServerResponse<DataType>{
	private msg?:string;
	private status:number;
	private data?:DataType;
	constructor({msg,status,data}:IServerResponse<DataType>){
		this.status=status;
		this.msg=msg;
		this.data=data;
		for (const key in this) {
	
				const value = this[key];
				
				if(value==undefined){
					delete this[key];
				}
		}
	}
}

export const createSuccess=()=>{
	return new ServerResponse({status:ResponseStatus.SUCCESS});
}

export const createError=()=>{
	return new ServerResponse({status:ResponseStatus.ERROR,msg:'错误'});
}

export const createErrorByMessage=(msg:string)=>{
	return new ServerResponse({status:ResponseStatus.ERROR,msg});
}

export const createErrorByStatusMessage=(status:number,msg:string)=>{
	return new ServerResponse({status,msg});
}


export const createLoginError=()=>{
	return createErrorByStatusMessage(ResponseStatus.NEED_LOGIN,'需要登录！');
}
