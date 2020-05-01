import faker from 'faker'

import { Income } from '../models'

const NUMBER_OF_ONE_OFF_INCOMES = 2
const NUMBER_OF_RECURRING_INCOMES = 7

export const fakeIncomes = async (userId: string, fakeAccountIds: string[]) => {
  console.log(await fakeOneOffIncomes(userId, fakeAccountIds))
  console.log(await fakeRecurringIncomes(userId, fakeAccountIds))
}

const fakeOneOffIncomes = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_ONE_OFF_INCOMES; i++) {
    const fakeIncome = new Income({
      title: faker.commerce.productName(),
      description: faker.commerce.product(),
      amount: faker.commerce.price(50, 200, 2),
      date: faker.date.past(1),
      recurring: false,
      payer: faker.company.companyName(),
      accountId: faker.random.arrayElement(fakeAccountIds),
      userId,
    })
    await fakeIncome.save()
  }
  return `${NUMBER_OF_ONE_OFF_INCOMES} one off incomes created`
}
const fakeRecurringIncomes = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_RECURRING_INCOMES; i++) {
    const fakeIncome = new Income({
      title: faker.commerce.productName(),
      description: faker.commerce.product(),
      amount: faker.commerce.price(500, 3000, 2),
      date: faker.date.past(1),
      recurring: true,
      frequency: faker.random.arrayElement(['Daily', 'Weekly', 'Monthly', 'Yearly']),
      daysPerWeek: faker.random.number(5),
      payer: faker.company.companyName(),
      accountId: faker.random.arrayElement(fakeAccountIds),
      userId,
    })
    await fakeIncome.save()
  }
  return `${NUMBER_OF_RECURRING_INCOMES} recurring incomes created`
}
