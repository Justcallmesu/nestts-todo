// Core Components
import { Module } from "@nestjs/common";

// Controllers
import {AuthController} from "./auth.controller"

// Services
import {AuthService} from "./auth.service"

// Database
import { Users,UserSchema } from "src/modules/schemas/auth.schema";
import { MongooseModule } from "@nestjs/mongoose";



@Module({
    imports:[MongooseModule.forFeature([{name:Users.name,schema:UserSchema}])],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule{}