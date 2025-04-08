import mongoose, { Schema, Document } from 'mongoose';

interface Order extends Document {
  email: string;
  product: mongoose.Types.ObjectId; // This should be ObjectId, as it's a reference to the 'Bicycle' collection
  quantity: number;
  totalPrice: number;
}

const orderSchema: Schema = new Schema<Order>(
  {
    email: { type: String, required: true },
    product: {
      type: Schema.Types.ObjectId, // Correct type for a reference to another collection
      ref: 'Bicycle', // Reference to the 'Bicycle' collection
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model<Order>('Order', orderSchema);

export { OrderModel };
