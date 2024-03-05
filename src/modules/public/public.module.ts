// Nest JS Components
import { Module } from "@nestjs/common";

// Modules
import {TodolistModule} from "./todolist/todolist.module"

@Module({
    imports:[TodolistModule]
})
export class PublicModule{}