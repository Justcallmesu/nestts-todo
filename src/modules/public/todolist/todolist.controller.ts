// Core Components
import { Controller,Res,Req,Param,Get,Post, Put, Body, Delete} from "@nestjs/common";
import { Request,Response } from "express";

// Interface
import {Params} from "../../Interface/params.interface"
import { todolistservice } from "./todolist.service";

// DTO
import { UpdateTodoDTo,PostTodoDTO } from "./todolist.dto";

@Controller("todo")
export class TodoController{
    constructor(private todo:todolistservice){}

    @Get("/")
    getTodo(@Res() res:Response):void{
        this.todo.GetTodo(res);
    }

    @Post("/")
    PostTodo(@Res() res:Response,@Body() body:PostTodoDTO){
        this.todo.PostTodo(res,body);
    }

    @Put("/:id")
    UpdateTodo(@Res() res:Response,@Body() body:UpdateTodoDTo,@Param() params:Params):void{
        this.todo.UpdateTodo(res,body,params);
    }

    @Delete("/:id")
    DeleteTodo(@Res() res:Response,@Param() params:Params):void{
        this.todo.DeleteTodo(res,params);
    }
}