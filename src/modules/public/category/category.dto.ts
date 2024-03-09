import { IsNotEmpty, IsString, IsArray } from "class-validator";

export class CategoryDTO{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsArray()
    users:Array<string>=[]
}