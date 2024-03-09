// NestJS Components
import { Module } from "@nestjs/common";

// Controller
import {TodoController} from "./todolist.controller"

// Mongoose
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";

// Database Schema
import { Todo,TodoSchema } from "src/modules/schemas/todolist.schema";
import { todolistservice } from "./todolist.service";
import { Categories, CategorySchema } from "src/modules/schemas/category.schema";


@Module({
    imports:[MongooseModule.forFeature([{name:Todo.name,schema:TodoSchema},{name:Categories.name,schema:CategorySchema}])],
    controllers:[TodoController],
    providers:[todolistservice]
})
export class TodolistModule{}