import { HttpStatus, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import { Request, Response } from "express";

// Auth Schema
import {UserSchema, Users} from "../../schemas/auth.schema"
import { Document, Model, MongooseError, ProjectionFields } from "mongoose";

// Error
import {ErrorException} from "../../error/RequestException"

// Response
import { ResponseClass } from "src/modules/class/Response.class";

// DTO
import {RegisterDTO,LoginDTO} from "./auth.dto"

// Functions
import { JWTConstruct } from "src/modules/functions/JWTConstructor";
import { verify } from "jsonwebtoken";
import { JWTverify } from "src/modules/Interface/params.interface";

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

        res.cookie("AccessToken",JWTConstruct(newUser?.id),{httpOnly:true});

        res.json(new ResponseClass(201,"User Successfully Created"));
        return;
    }

    async Login(LoginDTO:LoginDTO, res:Response):Promise<undefined>{
        const document:Document<Users>|null = await this.AuthModel.findOne({username:LoginDTO.username});
        const data = document?.toObject()

        if(!data) throw new ErrorException("Bad Request",HttpStatus.BAD_REQUEST,"Username or Password incorrect"); 
        if(!await document?.schema.methods.ComparePassword(LoginDTO.password, data.password)) throw new ErrorException("Bad Request",HttpStatus.BAD_REQUEST,"Username or Password incorrect"); 

        res.cookie("AccessToken",JWTConstruct(data?._id),{httpOnly:true,secure:true});

        res.json(new ResponseClass(200,"Login Successfully"));

        return;
    }

    async logout(res:Response):Promise<void>{
        res.cookie("AccessToken","").end();
    }

    async GetUserInfo(req:Request,res:Response){
        const {cookies} = req;

        const verified = await verify(cookies?.AccessToken,process.env.JWT_SECRET_ACCESS as string) as JWTverify;

        const document:ProjectionFields<Document<Users>>|null = await this.AuthModel.findById(verified.UserId).select("-password -_id -__v");

        const data = document.toObject();

        res.status(200).json(new ResponseClass(200,"Data Success",data));

    }
}