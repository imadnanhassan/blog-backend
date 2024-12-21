import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('User', UserSchema);
