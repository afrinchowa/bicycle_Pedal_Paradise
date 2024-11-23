import { Schema, model, connect } from 'mongoose';
import { Bicycle } from './bicycle.interface';

const bicycleSchema = new Schema<Bicycle>({
    id:{type:String},
    name:{type: String , required:true},
    price:{type:Number,required:true},
    type:{type: String , required:true},
    description:{type: String , required:true},
    quantity:{type:Number,required:true},
    inStock:{type:Boolean,required:true},
})
export const BicycleModel = model<Bicycle>('Bicycle',bicycleSchema )