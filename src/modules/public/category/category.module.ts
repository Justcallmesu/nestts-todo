// Core Components
import { Module } from "@nestjs/common";

// Controllers
import {CategoryController} from "./category.controller"

// Services
import {CategoryService} from "./category.service"

// Database
import { Categories,CategorySchema } from "src/modules/schemas/category.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[MongooseModule.forFeature([{name:Categories.name,schema:CategorySchema}])],
    providers:[CategoryService],
    controllers:[CategoryController]
})
export class AuthModule{}