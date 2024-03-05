import {Controller,Res, Post,Body} from "@nestjs/common"
import {Response} from "express"

@Controller("Auth")
export class AuthController{
    @Post("/register")
    Register(@Body() body:any){
        return "This is Register"
    }
}