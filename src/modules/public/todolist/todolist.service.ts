import { Body, Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { Params } from "src/modules/Interface/params.interface";
import { ResponseClass } from "src/modules/class/Response.class";

// DTO
import {PostTodoDTO,UpdateTodoDTo} from "./todolist.dto"

// Database
import { Todo } from "src/modules/schemas/todolist.schema";

@Injectable()
export class todolistservice{
    constructor(@InjectModel(Todo.name) private todo:Model<Todo>){}
    async GetTodo(@Res() res:Response){
        const {userID} = res.locals;

        const data = await this.todo.find({userID});
        res.json(new ResponseClass(200,"Data Extracted",data));
    }

    async PostTodo(@Res() res:Response,@Body() body:PostTodoDTO){
        const {userID} = res.locals;

        const data = await this.todo.create({userID,...body});
        res.json(new ResponseClass(201,"Data Posted",data));
    }

    async UpdateTodo(@Res() res:Response, @Body() body:UpdateTodoDTo,@Param() params:Params){
        const {userID} = res.locals;
        const {id} =  params;

        const data = await this.todo.updateOne({userID,_id:id},body);
        res.json(new ResponseClass(200,"Data Extracted",data));
    }

    async DeleteTodo(@Res() res:Response,@Param() params:Params){
        const {userID} = res.locals;
        const {id} =  params;

        await this.todo.deleteOne({userID,_id:id});
        res.status(204).end();
    }
}