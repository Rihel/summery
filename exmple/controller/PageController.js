import { Controller,Get,Post, Auth } from "../../"
import UserService from "../service/UserService";


const userService= new UserService();
@Controller("/")
export  class PageController{
	

	@Get('/')
	async home(ctx,next){
		ctx.body=await userService.getAllUser();
	}
}