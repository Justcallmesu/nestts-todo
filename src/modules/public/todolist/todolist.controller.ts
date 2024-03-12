// Core Components
import { Controller,Res,Req,Param,Get,Post, Put, Body, Delete, ValidationPipe, Query} from "@nestjs/common";
import { Response } from "express";

// Interface
import {Params} from "../../Interface/params.interface"
import { todolistservice } from "./todolist.service";

// DTO
import { UpdateTodoDTo,PostTodoDTO, QueryDTO } from "./todolist.dto";

// Validation Pipe


@Controller("todo")
export class TodoController{
    constructor(private todo:todolistservice){}

    @Get("/:id?")
    async getTodo(@Res() res:Response, @Param() params:Params,@Query() query:any){
        await this.todo.GetTodo(res,params,query);
    }

    @Post()
    async PostTodo(@Res() res:Response,@Body(new ValidationPipe()) body:PostTodoDTO, @Param() params:Params,@Query() query:QueryDTO){
        await this.todo.PostTodo(res,body,params,query);
    }

    @Put("/:id")
    async UpdateTodo(@Res() res:Response,@Body(new ValidationPipe()) body:UpdateTodoDTo,@Param() params:Params){
        await this.todo.UpdateTodo(res,body,params);
    }

    @Delete("/:id")
    async DeleteTodo(@Res() res:Response,@Param() params:Params){
        await this.todo.DeleteTodo(res,params);
    }
}