// src/routes/user.routes.ts
import express from 'express';
import { adminLogin, loginUser, registerUser } from './user.controller';
import { userLoginSchema, userRegisterSchema } from './userValidation';
import { validate } from '../../middleware/validate';

const Userrouter = express.Router();

// Route for user registration
Userrouter.post('/register', validate(userRegisterSchema), registerUser);

// Route for user login
Userrouter.post('/login', adminLogin, validate(userLoginSchema), loginUser);

export default Userrouter;
