import { z } from 'zod';

const createBicycleSchemaValidation = z.object({
  name: z.string().min(1, { message: 'Bicycle name is required.' }),
  brand: z.string().min(1, { message: 'Bicycle brand is required.' }),
  model: z.string().min(1, { message: 'Bicycle model is required.' }),
  img: z.string().url({ message: 'Bicycle image must be a valid URL.' }),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    errorMap: () => {
      return { message: 'Bicycle type is required.' };
    },
  }),
  category: z.enum(
    [
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
    {
      errorMap: () => {
        return { message: 'Bicycle category is required.' };
      },
    },
  ),
  description: z
    .string()
    .max(500, { message: 'Description should not exceed 500 characters.' })
    .optional(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a positive number.' }),
  inStock: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
});

export const bicycleValidation = {
  createBicycleSchemaValidation,
};
