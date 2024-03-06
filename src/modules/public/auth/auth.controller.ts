import {Controller,Res, Post,Body} from "@nestjs/common"
import {Response} from "express"

// Service
import {AuthService} from "./auth.service"

@Controller("auth")
export class AuthController{
    constructor(private auth:AuthService){}

    @Post("/register")
    Register(@Body() body:any){
        this.auth.Register(body)
        return "This is Register"
    }
}