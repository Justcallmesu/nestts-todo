// Nest JS Components
import { Module } from "@nestjs/common";

// Modules
import {TodolistModule} from "./todolist/todolist.module"
import {AuthModule} from "./auth/auth.module"

@Module({
    imports:[TodolistModule,AuthModule]
})
export class PublicModule{}