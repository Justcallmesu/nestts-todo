import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Users>

@Schema()
export class Users{
    @Prop({required:[true,"Username is required"]})
    username:string;

    @Prop({required:[true,"Password is required"]})
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.index({username:1},{unique:true});