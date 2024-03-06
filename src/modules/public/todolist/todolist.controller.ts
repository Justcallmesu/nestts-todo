// Core Components
import { Controller,Res,Param,Get,Post } from "@nestjs/common";
import { Request,Response } from "express";

// Interface
import {Params} from "../../Interface/params.interface"

@Controller("todo")
export class TodoController{
    @Get()
    getTodo(@Param() params:Params,@Res() res:Response):void{
        console.log(res.locals.userID)
        res.json({status:200,message:"hello World"});
    }
}