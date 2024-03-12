import {Controller,Res, Post,Body, Get, Req, Param} from "@nestjs/common"
import {Request, Response} from "express"

// Service
import {AuthService} from "./auth.service"
import { Params } from "src/modules/Interface/params.interface"

@Controller("auth")
export class AuthController{
    constructor(private auth:AuthService){}

    @Post("/register")
    async Register(@Body() body:any, @Res() res:Response){
        await this.auth.Register(body,res)
    }
    
    @Post("/login")
    async Login(@Body() body:any,@Res() res:Response){
        await this.auth.Login(body,res)
    }

    @Get("/logout")
    async Logout(@Res() res:Response){
        await this.auth.logout(res)
    }

    @Get("/userinfo/:name?")
    async GetUserInfo(@Req() req:Request,@Param() params:Params,@Res() res:Response){
        await this.auth.GetUserInfo(req,res,params)
    }

}