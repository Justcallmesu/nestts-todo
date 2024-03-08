import {Body, Controller, Delete, Get, Param, Post, Put, Req, Res} from "@nestjs/common"
import {} from "express"
import { Params } from "src/modules/Interface/params.interface"


// DTO
import { CategoryDTO } from "./category.dto"

@Controller("category")
export class CategoryController{
    @Get()
    async GetCategory(@Res() res:Response){

    }

    @Post()
    async PostCategory(@Res() res:Response,@Body() body:CategoryDTO){

    }

    @Put("/:id")
    async UpdateCategory(@Res() res:Response,@Param() params:Params,@Body() body:CategoryDTO){

    }

    @Delete("/:id")
    async DeleteCategory(@Res() res:Response,@Param() params:Params){

    }
}