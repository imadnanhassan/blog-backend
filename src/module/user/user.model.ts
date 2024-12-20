import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Check if the password is modified
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

export const UserModel = model<IUser>('User', UserSchema);
