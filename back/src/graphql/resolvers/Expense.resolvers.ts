import { Expense } from '../../db'

const queries = {
  getExpensesByUserId: async (_: any, { userId }: { userId: string }) =>
    await Expense.find({ userId }),
}

const mutations = {
  addExpense: async (_: unknown, { newExpense }: any) => {
    const expense = new Expense(newExpense)
    return await expense.save()
  },
  updateExpense: async (_: unknown, { expenseToUpdate }: any) => {
    return await Expense.findOneAndUpdate({ _id: expenseToUpdate.id }, expenseToUpdate, {
      new: true,
    })
  },
  deleteExpense: async (_: unknown, { id }: any) => {
    return await Expense.findOneAndDelete({ _id: id })
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
}

export { resolvers as ExpenseResolvers }
