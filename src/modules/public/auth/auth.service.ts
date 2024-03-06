import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

// Auth Schema
import {Users} from "../../schemas/auth.schema"
import { Document, Model } from "mongoose";

// Error
import {ErrorException} from "../../error/RequestException"

// DTO
import {RegisterDTO,LoginDTO} from "./auth.dto"

@Injectable()
export class AuthService{
    constructor(@InjectModel(Users.name) private AuthModel:Model<Users>){}
    
    async Register(RegisterDTO:RegisterDTO):Promise<Boolean|undefined>{
        if(RegisterDTO.confirmPassword !== RegisterDTO.password){
            throw new ErrorException("Bad Request",HttpStatus.BAD_REQUEST,"Password Doesnt Match");
        }

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