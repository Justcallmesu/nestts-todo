// NestJS Components
import { Module } from "@nestjs/common";

// Controller
import {TodoController} from "./todolist.controller"

// Mongoose
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";

// Database Schema
import { Todo,TodoSchema } from "src/modules/schemas/todolist.schema";


@Module({
    imports:[MongooseModule.forFeature([{name:Todo.name,schema:TodoSchema}])],
    controllers:[TodoController]
})
export class TodolistModule{}