import { Schema, model } from 'mongoose'

const ExpenseSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  startDate: String,
  endDate: String,
  accountId: String,
  userId: String,
})

const ExpenseModel = model('Expense', ExpenseSchema)

export { ExpenseModel as Expense }
