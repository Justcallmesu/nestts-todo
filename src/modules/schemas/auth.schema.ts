import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type AuthDocument = HydratedDocument<Auth>

@Schema()
export class Auth{
    @Prop({required:[true,"Username is required"],type:[String,"Username Data Type must a String"]})
    username:string;

    @Prop({required:[true,"Password is required"],type:[String,"Password Data Type must a String"]})
    password:string;
}