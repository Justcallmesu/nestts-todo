import {IsString,IsNotEmpty, IsDate, MaxLength, Max, IsBoolean} from "class-validator"

export class PostTodoDTO{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string;
}

export class UpdateTodoDTo{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string;

    @IsBoolean()
    isCompleted:boolean;
}