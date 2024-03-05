// Core Components
import { Controller,Res,Param,Get,Post } from "@nestjs/common";
import { Request,Response } from "express";

// Interface
import {Params} from "../../Interface/params.interface"

@Controller("todo")
export class TodoController{
    @Get("/:id")
    getTodo(@Param() params:Params,@Res() res:Response):void{
        
        res.json({status:200,message:"hello World"});
    }
}