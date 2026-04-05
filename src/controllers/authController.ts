import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const { user, token } = await authService.register({ email, password, name });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error });
  }
};
