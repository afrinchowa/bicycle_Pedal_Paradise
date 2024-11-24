import mongoose, { Schema } from "mongoose";
import { Bicycle } from "./bicycle.interface";


const bicycleSchema: Schema = new Schema<Bicycle>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ["Mountain", "Road", "Hybrid", "BMX", "Electric"], required: true },
  description: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, default: true },
  isDeleted:{type:Boolean,default:false}
}, { timestamps: true },

);

export const BicycleModel= mongoose.model<Bicycle>("Bicycle", bicycleSchema);
