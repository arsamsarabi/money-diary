import { Income, Account, User } from '../../db'

const queries = {
  getMyIncomes: async (_: any, { user }: { user: string }) => await Income.find({ user }),
}

const mutations = {
  addIncome: async (_: unknown, { newIncome }: any) => {
    const income = new Income(newIncome)
    return await income.save()
  },
  updateIncome: async (_: unknown, { incomeToUpdate }: any) => {
    return await Income.findOneAndUpdate({ _id: incomeToUpdate.id }, incomeToUpdate, {
      new: true,
    })
  },
  deleteIncome: async (_: unknown, { id, userId }: any) => {
    return await Income.findOneAndDelete({ _id: id, user: userId })
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
  Income: {
    account: async ({ account }: any) => await Account.findOne({ _id: account }),
    user: async ({ user }: any) => await User.findOne({ _id: user }),
  },
}

export { resolvers as IncomeResolvers }
