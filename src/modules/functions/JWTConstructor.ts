import {sign} from "jsonwebtoken";

export function JWTConstruct(id:string):Object{
    const token = sign({UserId:id},
        process.env.JWT_SECRET_ACCESS as string,
        {expiresIn:"1d"}
        );

    return token;
}