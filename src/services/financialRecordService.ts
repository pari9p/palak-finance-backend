import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export const getAllRecords = async (userId: number, query: any) => {
  const { type, category, startDate, endDate } = query;
  const where: any = { userId };

  if (type) {
    where.type = type as string;
  }
  if (category) {
    where.category = category;
  }
  if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  return prisma.financialRecord.findMany({ where });
};

export const getRecordById = async (id: number, userId: number) => {
  return prisma.financialRecord.findFirst({ where: { id, userId } });
};

export const createRecord = async (data: Prisma.FinancialRecordCreateWithoutUserInput, userId: number) => {
  return prisma.financialRecord.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const updateRecord = async (id: number, data: Prisma.FinancialRecordUpdateInput, userId: number) => {
  return prisma.financialRecord.updateMany({
    where: { id, userId },
    data,
  });
};

export const deleteRecord = async (id: number, userId: number) => {
  return prisma.financialRecord.deleteMany({ where: { id, userId } });
};
