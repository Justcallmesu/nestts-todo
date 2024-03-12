import {IsString,IsNotEmpty, IsDate, MaxLength, Max, IsBoolean} from "class-validator"

export class PostTodoDTO{
    @IsNotEmpty({message:"Please Attach Title"})
    @IsString()
    @MaxLength(50)
    title: string;
}

export class UpdateTodoDTo{
    title?: string;

    description?:string

    isCompleted?:boolean;
}

export class QueryDTO{
    isCompleted:string;
}