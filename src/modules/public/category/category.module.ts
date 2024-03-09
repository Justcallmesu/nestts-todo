// Core Components
import { Module } from "@nestjs/common";

// Controllers
import {CategoryController} from "./category.controller"

// Services
import {CategoryService} from "./category.service"

// Database
import { Categories,CategorySchema } from "src/modules/schemas/category.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "src/modules/schemas/todolist.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:Categories.name,schema:CategorySchema},{name:Todo.name,schema:TodoSchema}])],
    providers:[CategoryService],
    controllers:[CategoryController]
})
export class CategoryModule{}