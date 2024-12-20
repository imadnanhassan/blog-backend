import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  // Implement logic to create a new user
  try {
    const payload = req.body;

    console.log(payload);
    const result = await userService.createUsertoDB(payload);

    res.status(201).json({
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const userController = {
  createUser,
 
};
