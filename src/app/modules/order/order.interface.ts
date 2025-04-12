import mongoose, { Document } from 'mongoose';

export interface TOrder extends Document {
  email: string;
  title?: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  status: string;
  transaction: string;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TRevenue {
  totalRevenue: number;
}
