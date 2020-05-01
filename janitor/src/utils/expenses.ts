import faker from 'faker'

import { Expense } from '../models'
import { getRandomCatIds } from './categories'

const NUMBER_OF_EXPENSES = 15

export const fakeExpenses = async (userId: string, fakeAccountIds: string[]) => {
  console.log(await fakeOneOffExpenses(userId, fakeAccountIds))
  console.log(await fakeRecurringExpenses(userId, fakeAccountIds))
}

const fakeOneOffExpenses = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_EXPENSES; i++) {
    const fakeExpense = new Expense({
      title: faker.commerce.productName(),
      description: faker.commerce.product(),
      amount: faker.commerce.price(0.5, 1000, 2),
      date: faker.date.past(1),
      recurring: false,
      categories: getRandomCatIds(),
      payee: faker.company.companyName(),
      accountId: faker.random.arrayElement(fakeAccountIds),
      userId,
    })
    await fakeExpense.save()
  }
  return `${NUMBER_OF_EXPENSES} one off expenses created`
}

const fakeRecurringExpenses = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_EXPENSES; i++) {
    const fakeExpense = new Expense({
      title: faker.commerce.productName(),
      description: faker.commerce.product(),
      amount: faker.commerce.price(0.5, 1000, 2),
      date: faker.date.past(1),
      recurring: true,
      frequency: faker.random.arrayElement(['Daily', 'Weekly', 'Monthly', 'Yearly']),
      categories: getRandomCatIds(),
      payee: faker.company.companyName(),
      accountId: faker.random.arrayElement(fakeAccountIds),
      userId,
    })
    await fakeExpense.save()
  }
  return `${NUMBER_OF_EXPENSES} recurring expenses created`
}
