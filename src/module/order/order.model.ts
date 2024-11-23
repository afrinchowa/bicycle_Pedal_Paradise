import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  email: string;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

const OrderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Bicycle', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, {
  timestamps: true,
});

export const OrderModel = model<IOrder>('Order', OrderSchema);
