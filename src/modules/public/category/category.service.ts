import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model } from "mongoose";

// Interface
import { Params } from "src/modules/Interface/params.interface";

// Database
import { Categories } from "src/modules/schemas/category.schema";

// DTO
import { CategoryDTO } from "./category.dto"
import { ResponseClass } from "src/modules/class/Response.class";
import { Todo } from "src/modules/schemas/todolist.schema";

@Injectable()
export class CategoryService{
    constructor(
        @InjectModel(Categories.name) private categoryModel:Model<Categories>, 
        @InjectModel(Todo.name) private todoModel:Model<Todo>
        ){}


    async GetCategory(res:Response){
        const {userID} = res.locals;

        const categories = await this.categoryModel.find({userID:{$in:[userID]}});

        res.status(200).json(new ResponseClass(200,"Success",categories))
    }

    async PostCategory(res:Response, body:CategoryDTO){
        const {userID} = res.locals;
        const {title,users=[]} = body
        const categories = await this.categoryModel.create({title:title,userID:[userID,...users]});

        res.status(201).json(new ResponseClass(201,"Data Created",categories));
    }

    async PutCategory(res:Response,params:Params,body:CategoryDTO){
        const {userID} = res.locals;
        const {title,users=[]} = body;

        const categories = await this.categoryModel.updateOne({_id:params.id,userID:{$in:[userID]}},{title,userID:[userID,...users]});

        res.status(200).json(new ResponseClass(200,"success",categories));
    }

    async DeleteCategory(res:Response,params:Params){
        const {userID} = res.locals;

        await this.categoryModel.deleteOne({_id:params.id,userID:{$in:[userID]}});

        await this.todoModel.deleteMany({categoriesID:params.id});

        res.status(204).end();
    }
}