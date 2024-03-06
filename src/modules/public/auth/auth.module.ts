// Core Components
import { Module } from "@nestjs/common";

// Controllers
import {AuthController} from "./auth.controller"

// Services
import {AuthService} from "./auth.service"

// Database
import { Users,UserSchema } from "src/modules/schemas/auth.schema";
import { MongooseModule } from "@nestjs/mongoose";

// Library
import * as bcrypt from "bcrypt"


@Module({
    imports:[
            MongooseModule.forFeatureAsync([
                {
                    name:Users.name,
                    useFactory:()=>{
                        const schema = UserSchema;

                        schema.pre('save', async function(){
                            this.password = await bcrypt.hash(this.password,11);
                        });
                        
                        return schema;
                    }
                }
            ])],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule{}