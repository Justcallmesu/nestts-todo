import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { compare } from "bcrypt";
import mongoose, { Document, HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<Users>

@Schema()
export class Users extends Document{
    @Prop({required:[true,"Username is required"]})
    username:string;

    @Prop({required:[true,"Password is required"]})
    password:string;

}

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.index({username:1},{unique:true});

UserSchema.methods.ComparePassword = async (candidate:string,target:string)=>{
    return await compare(candidate,target);
}