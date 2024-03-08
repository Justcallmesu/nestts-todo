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

@Injectable()
export class CategoryService{
    constructor(@InjectModel(Categories.name) private categoryModel:Model<Categories>){}
    GetCategory(res:Response){

    }

    PostCategory(res:Response, body:CategoryDTO){

    }

    PutCategory(res:Response,params:Params,body:CategoryDTO){

    }

    DeleteCategory(res:Response,params:Params){

    }
}