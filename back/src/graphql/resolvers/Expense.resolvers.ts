import { Expense, Category } from '../../db'

const addGeneralCategory = async (exp: any) => {
  const expense = { ...exp }
  if (!expense.categories || !expense.categories.length) {
    const generalCategory = await Category.findOne({ label: 'General' })
    expense.categories = [generalCategory?.id]
  }
  return expense
}

const queries = {
  getExpensesByUserId: async (_: any, { userId }: { userId: string }) =>
    await Expense.find({ userId }),
}

const mutations = {
  addExpense: async (_: unknown, { newExpense }: any) => {
    const expenseToAdd = await addGeneralCategory(newExpense)
    const expense = new Expense(expenseToAdd)
    return await expense.save()
  },
  updateExpense: async (_: unknown, { expenseToUpdate }: any) => {
    const exp = await addGeneralCategory(expenseToUpdate)
    return await Expense.findOneAndUpdate({ _id: exp.id }, exp, {
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
  Expense: {
    categories: async ({ categories }: any) => {
      const allCategories = await Category.find()
      const result = categories.map((catId: string) =>
        allCategories.find((cat) => cat.id === catId),
      )
      return result
    },
  },
}

export { resolvers as ExpenseResolvers }
