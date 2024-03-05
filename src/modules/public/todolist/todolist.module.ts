// NestJS Components
import { Module } from "@nestjs/common";

// Controller
import {TodoController} from "./todolist.controller"


@Module({
    controllers:[TodoController]
})
export class TodolistModule{}