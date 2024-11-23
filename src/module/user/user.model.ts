import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      // validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid email type",
    },
  },
  photo: String,
  role: {
    type: String,
    enum:{values:["user" ,"admin"],message: "Please provide a valid role",},
    required: true,
  },
  userStatus: {
    type: String,
    enum: {
      values: ["active", "blocked"],
      message: "Status must be 'active' or 'blocked'",
    },
    default: "active",
  },
});

const User =model('user',userSchema)
export default User
