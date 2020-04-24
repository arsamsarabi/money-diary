import { User, Account, Expense, Recurring } from '../../db'

const queries = {
  me: async (_: any, { userId }: { userId: string }) => await User.findById(userId),
  getAccountsByUserId: async (_: any, { userId }: { userId: string }) =>
    await Account.find({ userId }),
  getExpensesByUserId: async (_: any, { userId }: { userId: string }) =>
    await Expense.find({ userId }),
}

const mutations = {
  addAccount: async (newAccount: any) => {
    const account = new Account(newAccount)
    await account.save()
  },
  addExpense: async (newExpense: string) => {
    const expense = new Expense(newExpense)
    await expense.save()
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
  },
}
