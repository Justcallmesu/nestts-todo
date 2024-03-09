import {IsString,IsNotEmpty, IsDate, MaxLength, Max, IsBoolean} from "class-validator"

export class PostTodoDTO{
    @IsNotEmpty({message:"Please Attach Title"})
    @IsString()
    @MaxLength(50)
    title: string;

    @IsNotEmpty({message:"Please Attach Description"})
    @IsString()
    description:string
}

export class UpdateTodoDTo{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @IsString()
    description:string

    @IsBoolean()
    isCompleted:boolean;
}