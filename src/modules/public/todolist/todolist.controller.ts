import { Controller,Req,Param,Get,Post } from "@nestjs/common";
import { Request } from "express";

function printData(value:Function){
    console.log(value);
}

@printData
@Controller("todo")
export class TodoController{
    @Get("/:id")
    getTodo(@Param() params:any):string{

        console.log(params)
        return "Todo"
    }
}