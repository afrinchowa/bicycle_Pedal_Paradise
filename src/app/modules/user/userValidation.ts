import { z } from 'zod';

 const userValidationSchema = z.object({
  id: z
    .string()
    .uuid({ message: 'ID must be a valid UUID' })
    .optional(), // optional because default is generated
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address'),
  photo: z
    .string()
    .url('Photo must be a valid URL')
    .nullable()
    .optional(), // default is null
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin'], {
    required_error: 'Role is required',
    invalid_type_error: 'Role must be either user or admin',
  }),
  userStatus: z
    .enum(['in-progress', 'blocked'], {
      invalid_type_error: 'Status must be in-progress or blocked',
    })
    .optional(), // default is in-progress
});

export default userValidationSchema;