import {Controller,Res, Post,Body} from "@nestjs/common"
import {Response} from "express"

// Service
import {AuthService} from "./auth.service"

@Controller("auth")
export class AuthController{
    constructor(private auth:AuthService){}

    @Post("/register")
    Register(@Body() body:any, @Res() res:Response){
        return this.auth.Register(body,res)
    }
    
    @Post("/login")
    async Login(@Body() body:any,@Res() res:Response){
        await this.auth.Login(body,res)
    }

    @Post("/logout")
    async Logout(@Res() res:Response){
        await this.auth.logout(res)
    }
}