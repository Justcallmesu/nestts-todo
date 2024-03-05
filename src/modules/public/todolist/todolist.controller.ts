import { Controller,Req,Get,Post } from "@nestjs/common";
import { Request } from "express";

function printData(value:Function){
    console.log(value);
}

@printData
@Controller("/todo")
export class TodoController{
    @Get()
    getTodo():string{
        return "Todo"
    }
}