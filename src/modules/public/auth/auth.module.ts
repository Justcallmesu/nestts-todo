// Core Components
import { Module } from "@nestjs/common";

// Controllers
import {AuthController} from "./auth.controller"

// Database
import { Users,UserSchema } from "src/modules/schemas/auth.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[MongooseModule.forFeature([{name:Users.name,schema:UserSchema}])],
    controllers:[AuthController]
})
export class AuthModule{}