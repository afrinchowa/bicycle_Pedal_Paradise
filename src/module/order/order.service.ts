import { OrderModel } from './order.model';
import { BicycleServices } from './bicycle.service';

const createOrder = async (email: string, productId: string, quantity: number) => {
  const bicycle = await BicycleServices.getSingleBicycleFromDB(productId);
  if (!bicycle) {
    throw new Error('Bicycle not found');
  }

  if (bicycle.quantity < quantity) {
    throw new Error('Insufficient stock');
  }

  const totalPrice = bicycle.price * quantity;
  
  // Update bicycle stock
  bicycle.quantity -= quantity;
  if (bicycle.quantity === 0) bicycle.inStock = false;
  await bicycle.save();

  const order = await OrderModel.create({
    email,
    product: bicycle._id,
    quantity,
    totalPrice,
  });
  return order;
};

const calculateTotalRevenue = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },
    {
      $unwind: '$bicycleDetails',
    },
    {
      $project: {
        total: { $multiply: ['$bicycleDetails.price', '$quantity'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$total' },
      },
    },
  ]);
  return revenue[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrder,
  calculateTotalRevenue,
};
