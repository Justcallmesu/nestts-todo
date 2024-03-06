import { Inject, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

// Auth Schema
import {Users} from "../../schemas/auth.schema"
import { Document, Model } from "mongoose";

// DTO
import {RegisterDTO,LoginDTO} from "./auth.dto"

@Injectable()
export class AuthService{
    constructor(@InjectModel(Users.name) private AuthModel:Model<Users>){}
    
    async Register(RegisterDTO:RegisterDTO):Promise<Boolean|undefined>{
        const newUser = new this.AuthModel(RegisterDTO);
        await newUser.save();
        return true;
    }

    async Login(LoginDTO:LoginDTO):Promise<Document<Users> | null>{
        console.log(LoginDTO)
        const data:Document<any>|null = await this.AuthModel.findOne({username:LoginDTO.username});
        return data;
    }
}