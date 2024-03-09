import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

// Auth Schema
import {Users} from "./auth.schema"
import {Todo} from "./todolist.schema"

export type CategoryDocument = HydratedDocument<Todo>;

@Schema()
export class Categories{
    @Prop({required:true, maxlength:[50,"Character exceeding the limit"]})
    title:string

    @Prop({required:true,type:Array<mongoose.Schema.Types.ObjectId>,ref:"Users"})
    userID:Array<Users>
};

export const CategorySchema = SchemaFactory.createForClass(Categories);

CategorySchema.index({userID:1})