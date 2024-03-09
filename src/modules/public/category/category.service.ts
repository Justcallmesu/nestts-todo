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

@Injectable()
export class CategoryService{
    constructor(@InjectModel(Categories.name) private categoryModel:Model<Categories>){}
    async GetCategory(res:Response){
        const {userID} = res.locals;

        const categories = await this.categoryModel.find({userID:{$in:[userID]}});

        res.status(200).json(new ResponseClass(200,"Success",categories))
    }

    async PostCategory(res:Response, body:CategoryDTO){

    }

    async PutCategory(res:Response,params:Params,body:CategoryDTO){

    }

    async DeleteCategory(res:Response,params:Params){

    }
}