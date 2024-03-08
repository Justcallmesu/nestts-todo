// Nest JS Components
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

// Modules
import {TodolistModule} from "./todolist/todolist.module"
import {AuthModule} from "./auth/auth.module"
import { CheckAccess } from "../middleware/Auth.Middleware";

@Module({
    imports:[TodolistModule,AuthModule]
})
export class PublicModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckAccess).forRoutes('todo');
        consumer.apply(CheckAccess).forRoutes({path:"auth/userinfo",method:RequestMethod.GET})
        consumer.apply(CheckAccess).forRoutes({path:"category",method:RequestMethod.ALL})
    }
}