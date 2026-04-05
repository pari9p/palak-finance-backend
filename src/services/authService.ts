import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (userData: Prisma.UserCreateInput) => {
  const { email, password, name } = userData;

  const userCount = await prisma.user.count();
  const role = userCount === 0 ? 'ADMIN' : 'VIEWER';

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  // Omit password from the returned user object
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  // Omit password from the returned user object
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
