import prisma from '../config/prisma';

export const getSummary = async (userId: number) => {
  const totalIncome = await prisma.financialRecord.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: 'INCOME',
    },
  });

  const totalExpenses = await prisma.financialRecord.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId,
      type: 'EXPENSE',
    },
  });

  const netBalance = (totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0);

  const categoryTotals = await prisma.financialRecord.groupBy({
    by: ['category', 'type'],
    _sum: {
      amount: true,
    },
    where: {
      userId,
    },
  });

  const recentActivity = await prisma.financialRecord.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: 'desc',
    },
    take: 5,
  });

  return {
    totalIncome: totalIncome._sum.amount || 0,
    totalExpenses: totalExpenses._sum.amount || 0,
    netBalance,
    categoryTotals,
    recentActivity,
  };
};
