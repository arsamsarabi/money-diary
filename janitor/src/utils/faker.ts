import faker from 'faker'
import mongoose from 'mongoose'

import { Account, Expense, Income, Category } from '../../../back/src/db'
import { populateCategories } from './categories'

export const fakePopulateDB = async (userId: string) => {
  dropCollections()
  // populateCategories()
  // await fakeAccounts(userId)
  // await fakeExpenses()
  // await fakeRecurringExpenses()
  // await fakeIncomes()
  // await fakeRecurringIncomes()
  process.exit()
}

const dropCollections = () => {
  const connection = mongoose.connection

  connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.log(err)
    } else {
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].name !== 'users') {
          mongoose.connection.db.dropCollection(collections[i].name, (err, result) => {
            if (err) {
              console.log(err)
            } else {
              console.log(`${collections[i].name} dropped`)
            }
          })
        }
      }
    }
  })
}

const fakeAccounts = async (userId: string) => {
  const accountsToCreate = []
  for (let i = 0; i < 3; i++) {
    accountsToCreate.push({
      name: faker.company.companyName(),
      description: faker.company.catchPhraseDescriptor(),
      userId,
    })
  }
}

const fakeExpenses = () => {}
const fakeRecurringExpenses = () => {}

const fakeIncomes = () => {}
const fakeRecurringIncomes = () => {}
