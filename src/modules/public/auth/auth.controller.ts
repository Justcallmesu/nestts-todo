import {Controller,Res, Post,Body, Get, Req} from "@nestjs/common"
import {Request, Response} from "express"

// Service
import {AuthService} from "./auth.service"

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

    @Get("/userinfo")
    async GetUserInfo(@Req() req:Request,@Res() res:Response){
        await this.auth.GetUserInfo(req,res)
    }

}