import { Inject, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

// Auth Schema
import {Users} from "../../schemas/auth.schema"
import { Model } from "mongoose";

// DTO
import {RegisterDTO} from "./auth.dto"


@Injectable()
export class AuthService{
    constructor(@InjectModel(Users.name) private AuthModel:Model<Users>){}
    Register(RegisterDTO:RegisterDTO):void{
    }
}