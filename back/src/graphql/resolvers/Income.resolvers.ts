import { Income } from '../../db'

const queries = {
  getIncomesForUser: async (_: any, { userId }: { userId: string }) =>
    await Income.find({ userId }),
  getIncomesForAccount: async (_: any, { accountId }: { accountId: string }) =>
    await Income.find({ accountId }),
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
    return await Income.findOneAndDelete({ _id: id, userId })
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
}

export { resolvers as IncomeResolvers }
