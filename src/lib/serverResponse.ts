
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

export enum ResponseErrorText{
	ERROR='请求错误',
	NEED_LOGIN='需要登录',
	MISS_ARG = '缺少参数'
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

export const createSuccess=<T>(option:IServerResponse<T>)=>{
	return new ServerResponse<T>(option);
}

export const createSuccessByMsg=(msg:string)=>{
	return createSuccess({
		status:ResponseStatus.SUCCESS,
		msg,
	})
}

export const createSuccessByStatus=(status:number)=>{
	return createSuccess({
		status
	})
}

export const createSuccessByData=<T>(data:T)=>{
	return createSuccess<T>({
		status:ResponseStatus.SUCCESS,
		data,
	})
}

export const createError=()=>{
	return new ServerResponse({status:ResponseStatus.ERROR,msg:ResponseErrorText.ERROR});
}

export const createErrorByMessage=(msg:string)=>{
	return new ServerResponse({status:ResponseStatus.ERROR,msg});
}

export const createErrorByStatusMessage=(status:number,msg:string)=>{
	return new ServerResponse({status,msg});
}


export const createLoginError=()=>{
	return createErrorByStatusMessage(ResponseStatus.NEED_LOGIN,ResponseErrorText.NEED_LOGIN);
}
