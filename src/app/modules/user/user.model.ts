/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-useless-escape */
import { v4 as uuidv4 } from 'uuid';

import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// import config from '../../config';
// import { v4 as uuidv4 } from 'uuid'; // Optional: Auto-generate id

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
      default: uuidv4,
      // // Uncomment if you want automatic UUIDs
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be less than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    photo: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid ,Role must be either user or admin',
      },
      required: [true, 'Role is required'],
    },
    userStatus: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: 'Status must be in-progress or blocked',
      },
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

// 🔐 Optional: Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Remove password from result after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
