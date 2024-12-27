// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import {
  createUser,
  findUserByEmail,
  generateToken,
  verifyPassword,
} from './user.service';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return sendResponse(res, {
      statusCode: 400,
      message: 'User already exists',
      data: null,
    });
  }

  // Create a new user
  const newUser = await createUser(email, password, name, role);

  return sendResponse(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await findUserByEmail(email);
  if (!user) {
    return sendResponse(res, {
      statusCode: 400,
      message: 'Invalid email or password',
      data: null,
    });
  }

  // Verify the password
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return sendResponse(res, {
      statusCode: 400,
      message: 'Invalid email or password',
      data: null,
    });
  }

  // Generate a JWT token
  const token = generateToken(user);

  return sendResponse(res, {
    statusCode: 200,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
  });
};
