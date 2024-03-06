import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

// Import
import {ErrorException} from "../error/RequestException"
import { JwtPayload, verify } from "jsonwebtoken";

interface JWTverify{
    UserId:string,
    iat:number,
    exp:number
}

@Injectable()
export class CheckAccess implements NestMiddleware{
    async use(req:Request,res:Response,next:NextFunction){
        const {cookies} = req;

        if(!cookies?.AccessToken) throw new ErrorException("Unauthorized",401,"Unauthorized Access");

        const verified = await verify(cookies.AccessToken,process.env.JWT_SECRET_ACCESS as string) as JWTverify;

        if(!verified) throw new ErrorException("Unauthorized",401,"Unauthorized Access");
        
        res.locals.userID = verified.UserId;

        next();
    }
}