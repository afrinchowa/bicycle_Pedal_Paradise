import mongoose, { Schema } from 'mongoose';
import { IBicycle } from './bicycle.interface';

const bicycleSchema: Schema = new Schema<IBicycle>(
  {
    name: {
      type: String,
      required: [true, 'Bicycle name is required.'],
    },
    brand: {
      type: String,
      required: [true, 'Bicycle brand is required.'],
    },
    model: {
      type: String,
      required: [true, 'Bicycle model is required.'],
    },
    img: {
      type: String,
      required: [true, 'Bicycle image is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Bicycle price is required.'],
      min: [0, 'Price must be a positive number.'],
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: [true, 'Bicycle type is required.'],
    },
    category: {
      type: String,
      enum: [
        'Men',
        'Women',
        'Kids',
        'Commuter',
        'Sport',
        'Professional',
        'Casual',
        'Urban Series',
        'Premium',
        'Budget',
      ],
      required: [true, 'Bicycle category is required.'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [500, 'Description should not exceed 500 characters.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity must be a positive number.'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//checking if a product is already exist!
//

export const BicycleModel = mongoose.model<IBicycle>('Bicycle', bicycleSchema);
