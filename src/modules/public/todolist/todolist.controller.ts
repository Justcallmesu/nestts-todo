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

    @Get("/:categoriesID")
    async getTodo(@Res() res:Response, @Param() params:Params){
        await this.todo.GetTodo(res,params);
    }

    @Post("/:categoriesID")
    async PostTodo(@Res() res:Response,@Body() body:PostTodoDTO, @Param() params:Params){
        await this.todo.PostTodo(res,body,params);
    }

    @Put("/:categoriesID/:id")
    async UpdateTodo(@Res() res:Response,@Body() body:UpdateTodoDTo,@Param() params:Params){
        await this.todo.UpdateTodo(res,body,params);
    }

    @Delete("/:categoriesID/:id")
    async DeleteTodo(@Res() res:Response,@Param() params:Params){
        await this.todo.DeleteTodo(res,params);
    }
}