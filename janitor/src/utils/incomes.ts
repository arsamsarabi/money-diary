import { company, commerce, random } from 'faker'

import { Income } from '../models'
import { dateGenerator, descriptionGenerator } from './helpers'

const NUMBER_OF_ONE_OFF_INCOMES = 7
const NUMBER_OF_RECURRING_INCOMES = 2

export const fakeIncomes = async (userId: string, fakeAccountIds: string[]) => {
  console.log(await fakeOneOffIncomes(userId, fakeAccountIds))
  console.log(await fakeRecurringIncomes(userId, fakeAccountIds))
}

const fakeOneOffIncomes = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_ONE_OFF_INCOMES; i++) {
    const fakeIncome = new Income({
      title: commerce.productName(),
      description: descriptionGenerator(),
      amount: commerce.price(50, 200, 2),
      date: dateGenerator(),
      recurring: false,
      payer: company.companyName(),
      account: random.arrayElement(fakeAccountIds),
      user: userId,
    })
    await fakeIncome.save()
  }
  return `${NUMBER_OF_ONE_OFF_INCOMES} one off incomes created`
}
const fakeRecurringIncomes = async (userId: string, fakeAccountIds: string[]) => {
  for (let i = 0; i < NUMBER_OF_RECURRING_INCOMES; i++) {
    const fakeIncome = new Income({
      title: commerce.productName(),
      description: descriptionGenerator(),
      amount: commerce.price(500, 2000, 2),
      date: dateGenerator(),
      recurring: true,
      frequency: random.arrayElement(['Daily', 'Weekly', 'Monthly', 'Yearly']),
      daysPerWeek: random.number(5),
      payer: company.companyName(),
      account: random.arrayElement(fakeAccountIds),
      user: userId,
    })
    await fakeIncome.save()
  }
  return `${NUMBER_OF_RECURRING_INCOMES} recurring incomes created`
}
