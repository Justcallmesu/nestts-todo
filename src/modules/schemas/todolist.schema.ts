import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

// Auth Schema
import {Users} from "./auth.schema"

export type TodoListDocument = HydratedDocument<Todo>;

@Schema()
export class Todo{
    @Prop({required:true, maxlength:[50,"Character exceeding the limit"],type:[String,"Data Type must a string"]})
    title:string

    @Prop({required:true,type:[mongoose.Schema.Types.ObjectId,"Data Type must an ObjectID"],ref:"Users"})
    userID:Users

    @Prop({required:true, default:new Date()})
    DatePosted:Date

    @Prop({default:false})
    isCompleted:Boolean
};

export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.index({userID:1})


