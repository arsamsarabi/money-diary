import {
  populateCategories,
  dropCollections,
  fakeAccounts,
  fakeExpenses,
  fakeIncomes,
} from './utils'

export const fakePopulateDB = async (userId: string) => {
  await dropCollections()
  await populateCategories()
  const fakeAccountIds = await fakeAccounts(userId)
  await fakeExpenses(userId, fakeAccountIds)
  await fakeIncomes(userId, fakeAccountIds)
  process.exit()
}
