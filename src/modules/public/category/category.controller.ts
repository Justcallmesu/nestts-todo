import {Body, Controller, Delete, Get, Param, Post, Put, Req, Res} from "@nestjs/common"
import { Response } from "express"
import { Params } from "src/modules/Interface/params.interface"


// DTO
import { CategoryDTO } from "./category.dto"
import { CategoryService } from "./category.service"

@Controller("category")
export class CategoryController{
    constructor(private category:CategoryService){}
    @Get("/:id?")
    async GetCategory(@Res() res:Response,@Param() params:Params){
        await this.category.GetCategory(res,params);
    }

    @Post()
    async PostCategory(@Res() res:Response,@Body() body:CategoryDTO){
        await this.category.PostCategory(res,body);
    }

    @Put("/:id")
    async UpdateCategory(@Res() res:Response,@Param() params:Params,@Body() body:CategoryDTO){
        await this.category.PutCategory(res,params,body);
    }

    @Delete("/:id")
    async DeleteCategory(@Res() res:Response,@Param() params:Params){
        await this.category.DeleteCategory(res,params);
    }
}