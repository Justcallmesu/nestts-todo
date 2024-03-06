import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorException extends HttpException{
    constructor(exception:string,status:number,message:string){
        super(message,status,
            {cause:exception,
                description:message
            });
    }
}