import { Request, Response } from 'express';

import {
  createUser,
  findUserByEmail,
  generateToken,
  verifyPassword,
} from './user.service';
import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

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

// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   // Check if user exists
//   const user = await findUserByEmail(email);
//   if (!user) {
//     return sendResponse(res, {
//       statusCode: 400,
//       message: 'Invalid email or password',
//       data: null,
//     });
//   }

//   // Verify the password
//   const isPasswordValid = await verifyPassword(password, user.password);
//   if (!isPasswordValid) {
//     return sendResponse(res, {
//       statusCode: 400,
//       message: 'Invalid email or password',
//       data: null,
//     });
//   }

//   // Generate a JWT token
//   const token = generateToken(user);

//   return sendResponse(res, {
//     statusCode: 200,
//     message: 'Login successful',
//     data: {
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//       },
//     },
//   });
// };

// Block user

export const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'User not found',
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: 'User blocked successfully',
      data: user,
    });
  } catch (error) {
    return sendResponse(res, {
      statusCode: 500,
      message: 'Server error',
      data: null,
    });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'User not found',
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    return sendResponse(res, {
      statusCode: 500,
      message: 'Server error',
      data: null,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Logging in user with email:', email);

  // Check if user exists
  const user = await findUserByEmail(email);
  console.log('User fetched:', user);

  if (!user) {
    console.log('User not found');
    return sendResponse(res, {
      statusCode: 400,
      message: 'Invalid email or password',
      data: null,
    });
  }

  // Verify the password
  const isPasswordValid = await verifyPassword(password, user.password);
  console.log('Password match:', isPasswordValid);

  if (!isPasswordValid) {
    console.log('Invalid password');
    return sendResponse(res, {
      statusCode: 400,
      message: 'Invalid email or password',
      data: null,
    });
  }

  // Generate a JWT token
  const token = generateToken(user);

  console.log('Login successful');
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


// Admin login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('Checking admin with email:', email);

    const admin = await User.findOne({ email, role: 'admin' });
    console.log('Admin fetched:', admin);

    if (!admin) {
      console.log('Admin not found');
      return sendResponse(res, {
        statusCode: 400,
        message: 'Invalid email or password',
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isPasswordValid);

    if (!isPasswordValid) {
      return sendResponse(res, {
        statusCode: 400,
        message: 'Invalid email or password',
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      'blog_backend',
      { expiresIn: '1h' }
    );

    return sendResponse(res, {
      statusCode: 200,
      message: 'Admin login successful',
      data: { token },
    });
  } catch (error) {
    console.error('Login error:', error);

    return sendResponse(res, {
      statusCode: 500,
      message: 'Internal server error',
      data: null,
    });
  }
};
