import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
});

// Pre-save middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
