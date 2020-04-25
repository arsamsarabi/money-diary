import dayjs from 'dayjs'

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)

import { User, Account, Expense, Recurring } from '../../db'

const queries = {
  me: async (_: any, { userId }: { userId: string }) => await User.findById(userId),
  getAccountsByUserId: async (_: any, { userId }: { userId: string }) =>
    await Account.find({ userId }),
  getExpensesByUserId: async (_: any, { userId }: { userId: string }) =>
    await Expense.find({ userId }),
  getRecurringsByUserId: async (_: any, { userId }: { userId: string }) =>
    await Recurring.find({ userId }),
}

const mutations = {
  addAccount: async (_: unknown, { newAccount }: any) => {
    const account = new Account(newAccount)
    return await account.save()
  },
  addExpense: async (_: unknown, { newExpense }: any) => {
    const expense = new Expense(newExpense)
    return await expense.save()
  },
}

export const resolvers = {
  Query: queries,
  Mutation: mutations,
  User: {
    accounts: async ({ _id }: any) => await Account.find({ userId: _id }),
  },
  Account: {
    expenses: async ({ _id }: any) => await Expense.find({ accountId: _id }),
    recurrings: async ({ _id }: any) => await Recurring.find({ accountId: _id }),
    expenditureSumTotal: async ({ _id }: any) => {
      const expenses: any = await Expense.find({ accountId: _id })
      return parseFloat(
        expenses.reduce((acc: number, expense: any) => acc + expense.amount, 0),
      ).toFixed(2)
    },
    expenditureSumMonth: async ({ _id }: any) => {
      const expenses: any = await Expense.find({ accountId: _id })
      const now = dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
      const filtered = expenses.filter((exp: any) => dayjs(exp.date).isSameOrAfter(now))
      return parseFloat(
        filtered.reduce((acc: number, expense: any) => acc + expense.amount, 0),
      ).toFixed(2)
    },
    expenditureSum30Days: async ({ _id }: any) => {
      const expenses: any = await Expense.find({ accountId: _id })
      const diff = dayjs().subtract(30, 'day')
      const filtered = expenses.filter((exp: any) => dayjs(exp.date).isSameOrAfter(diff))
      return parseFloat(
        filtered.reduce((acc: number, expense: any) => acc + expense.amount, 0),
      ).toFixed(2)
    },
  },
}
