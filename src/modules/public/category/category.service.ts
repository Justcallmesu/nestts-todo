import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Response } from "express";
import { Model } from "mongoose";
import { Params } from "src/modules/Interface/params.interface";
import { Categories } from "src/modules/schemas/category.schema";

@Injectable()
export class CategoryService{
    constructor(@InjectModel(Categories.name) private categoryModel:Model<Categories>){}
    GetCategory(res:Response){

    }

    PostCategory(res:Response, body:any){

    }

    PutCategory(res:Response,params:Params,body:any){

    }

    DeleteCategory(res:Response,params:Params){

    }
}