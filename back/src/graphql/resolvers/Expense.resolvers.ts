import { Expense } from '../../db'

const queries = {
  getExpensesByUserId: async (_: any, { userId }: { userId: string }) =>
    await Expense.find({ userId }),
}

const mutations = {
  addExpense: async (_: unknown, { ExpenseInput }: any) => {
    const expense = new Expense(ExpenseInput)
    return await expense.save()
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
}

export { resolvers as ExpenseResolvers }
