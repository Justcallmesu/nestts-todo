import {Body, Controller, Delete, Get, Param, Post, Put, Req, Res} from "@nestjs/common"
import {} from "express"
import { Params } from "src/modules/Interface/params.interface"


@Controller("category")
export class CategoryController{
    @Get()
    async GetCategory(@Res() res:Response){

    }

    @Post()
    async PostCategory(@Res() res:Response,@Body() body:any){

    }

    @Put("/:id")
    async UpdateCategory(@Res() res:Response,@Param() params:Params,@Body() body:any){

    }

    @Delete("/:id")
    async DeleteCategory(@Res() res:Response,@Param() params:Params){

    }
}