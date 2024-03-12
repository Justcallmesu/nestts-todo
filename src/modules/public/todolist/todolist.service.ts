import { Body, Inject, Injectable, Param, Query, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model, mongo } from "mongoose";
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
        const {id} = params;
        const {isCompleted,categoriesID=undefined} = queries;

        let query;
        query = {};

        if(id) query = {_id:id,...query};
        if(isCompleted) query = {...query,isCompleted:isCompleted==="true"?true:false}
        if(categoriesID) query = {categoriesID,...query};

        const data = await this.todo.find({...query,userID}).sort({isCompleted:1});
        res.json(new ResponseClass(200,"Data Extracted",data));
    }

    async PostTodo(@Res() res:Response,@Body() body:PostTodoDTO,@Param() params:Params,@Query() query:QueryDTO){
        const{userID} = res.locals;
        const {categoriesID} = query;
        let mongoQuery={};

        if(categoriesID){
            const isExist = await this.category.findOne({_id:categoriesID})
            
            if(!isExist){
                throw new ErrorException("Does Not Exist",404,"Category Doesnt Exist")
            }
            mongoQuery={categoriesID}
        }

        const data = await this.todo.create({...mongoQuery,...body,userID});
        res.json(new ResponseClass(201,"Data Posted",data));
    }

    async UpdateTodo(@Res() res:Response, @Body() body:UpdateTodoDTo,@Param() params:Params){
        const {id} =  params;

        const {categoriesID,description,isCompleted,title} = body

        let mongoQuery;
        
        mongoQuery = {description,isCompleted,title};
        
        if(categoriesID === "none") mongoQuery = {$unset:{categoriesID:""},...mongoQuery};
        else mongoQuery = {categoriesID,...mongoQuery};

        const data = await this.todo.findOneAndUpdate({_id:id},mongoQuery);

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