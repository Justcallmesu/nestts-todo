import { Body, Inject, Injectable, Param, Query, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { Params } from "src/modules/Interface/params.interface";
import { ResponseClass } from "src/modules/class/Response.class";

// DTO
import {PostTodoDTO,QueryDTO,UpdateTodoDTo} from "./todolist.dto"

// Database
import { Todo } from "src/modules/schemas/todolist.schema";
import { Categories } from "src/modules/schemas/category.schema";
import { ErrorException } from "src/modules/error/RequestException";

@Injectable()
export class todolistservice{
    constructor(@InjectModel(Todo.name) private todo:Model<Todo>, @InjectModel(Categories.name) private category:Model<Categories>){}
    async GetTodo(@Res() res:Response,@Param() params:Params, @Query() queries:QueryDTO){
        const {userID} = res.locals;
        const {categoriesID} = params;
        const {isCompleted} = queries;

        let query={};
        if(categoriesID) query = {categoriesID};
        if(isCompleted) query = {...query,isCompleted:isCompleted==="true"?true:false}

        const data = await this.todo.find({...query,userID}).sort({isCompleted:1});
        res.json(new ResponseClass(200,"Data Extracted",data));
    }

    async PostTodo(@Res() res:Response,@Body() body:PostTodoDTO,@Param() params:Params){
        const{userID} = res.locals;
        const {categoriesID} = params;
        let query={};

        if(categoriesID){
            const isExist = await this.category.findOne({_id:params.categoriesID})
            
            if(!isExist){
                throw new ErrorException("Does Not Exist",404,"Category Doesnt Exist")
            }
            query ={categoriesID}
        }

        const data = await this.todo.create({...query,...body,userID});
        res.json(new ResponseClass(201,"Data Posted",data));
    }

    async UpdateTodo(@Res() res:Response, @Body() body:UpdateTodoDTo,@Param() params:Params){
        const {id} =  params;

        const data = await this.todo.findOneAndUpdate({_id:id},body);

        if(!data) throw new ErrorException("Does Not Exist",404,"Data Not Found")
        
        res.json(new ResponseClass(200,"Data Updated",data));
    }

    async DeleteTodo(@Res() res:Response,@Param() params:Params){
        const {id} =  params;

        const status = await this.todo.findOneAndDelete({_id:id});

        if(!status) throw new ErrorException("Does Not Exist",404,"Data Doesnt Exist")

        res.status(204).end();
    }
}