import { Body, Inject, Injectable, Param, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { Params } from "src/modules/Interface/params.interface";
import { ResponseClass } from "src/modules/class/Response.class";

// DTO
import {PostTodoDTO,UpdateTodoDTo} from "./todolist.dto"

// Database
import { Todo } from "src/modules/schemas/todolist.schema";
import { Categories } from "src/modules/schemas/category.schema";
import { ErrorException } from "src/modules/error/RequestException";

@Injectable()
export class todolistservice{
    constructor(@InjectModel(Todo.name) private todo:Model<Todo>, @InjectModel(Categories.name) private category:Model<Categories>){}
    async GetTodo(@Res() res:Response,@Param() params:Params){
        const data = await this.todo.find({categoriesID:params.categoriesID});
        res.json(new ResponseClass(200,"Data Extracted",data));
    }

    async PostTodo(@Res() res:Response,@Body() body:PostTodoDTO,@Param() params:Params){
        const {userID} = res.locals;

        const isExist = await this.category.findOne({_id:params.categoriesID})

        if(!isExist){
            throw new ErrorException("Does Not Exist",404,"Category Doesnt Exist")
        }

        const data = await this.todo.create({userID,categoriesID:params.categoriesID,...body});
        res.json(new ResponseClass(201,"Data Posted",data));
    }

    async UpdateTodo(@Res() res:Response, @Body() body:UpdateTodoDTo,@Param() params:Params){
        const {id,categoriesID} =  params;

        const data = await this.todo.findOneAndUpdate({categoriesID:categoriesID,_id:id},body);

        if(!data) throw new ErrorException("Does Not Exist",404,"Data Not Found")
        
        res.json(new ResponseClass(200,"Data Updated",data));
    }

    async DeleteTodo(@Res() res:Response,@Param() params:Params){
        const {id,categoriesID} =  params;

        const status = await this.todo.findOneAndDelete({categoriesID:categoriesID,_id:id});

        if(!status) throw new ErrorException("Does Not Exist",404,"Data Doesnt Exist")

        res.status(204).end();
    }
}