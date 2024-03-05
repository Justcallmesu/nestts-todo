import {IsString,IsNotEmpty, IsDate, MaxLength, Max} from "class-validator"

export class TodolistDTO{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string;

    @IsNotEmpty()
    @IsDate()
    userID:Date;
}