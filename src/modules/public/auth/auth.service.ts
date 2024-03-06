import { HttpStatus, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import { Response } from "express";

// Auth Schema
import {UserSchema, Users} from "../../schemas/auth.schema"
import { Document, Model, MongooseError } from "mongoose";

// Error
import {ErrorException} from "../../error/RequestException"

// Response
import { ResponseClass } from "src/modules/class/Response.class";

// DTO
import {RegisterDTO,LoginDTO} from "./auth.dto"

// Functions
import { JWTConstruct } from "src/modules/functions/JWTConstructor";

@Injectable()
export class AuthService{
    constructor(@InjectModel(Users.name) private AuthModel:Model<Users>){}
    
    async Register(RegisterDTO:RegisterDTO, res:Response):Promise<Boolean|undefined>{
        if(RegisterDTO.confirmPassword !== RegisterDTO.password){
            throw new ErrorException("Bad Request",HttpStatus.BAD_REQUEST,"Password Doesnt Match");
        }

        let newUser;

        try{
            newUser = new this.AuthModel(RegisterDTO);
            await newUser.save();
        }catch(error){
            if(error.code === 11000) throw new ErrorException("CONFLICT",HttpStatus.CONFLICT,"Username is already taken");
        }

        res.cookie("AccessToken",JWTConstruct(newUser?.id));

        res.json(new ResponseClass(201,"User Successfully Created"));
        return;
    }

    async Login(LoginDTO:LoginDTO, res:Response):Promise<undefined>{
        const document:Document<Users>|null = await this.AuthModel.findOne({username:LoginDTO.username});
        const data = document?.toObject()

        if(!data) throw new ErrorException("Bad Request",HttpStatus.BAD_REQUEST,"Username or Password incorrect"); 
        if(!await document?.schema.methods.ComparePassword(LoginDTO.password, data.password)) throw new ErrorException("Bad Request",HttpStatus.BAD_REQUEST,"Username or Password incorrect"); 

        res.cookie("AccessToken",JWTConstruct(data?._id));

        res.json(new ResponseClass(200,"Login Successfully"));

        return;
    }

    async logout(res:Response):Promise<void>{

        res.cookie("AccessToken","").end();
    }
}