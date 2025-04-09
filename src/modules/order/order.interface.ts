import mongoose, { Document } from 'mongoose';

export interface TOrder extends Document {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
