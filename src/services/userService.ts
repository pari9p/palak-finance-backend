import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const { email, password, name, role, status } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      status,
    },
  });
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  if (typeof data.password === 'string') {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};
