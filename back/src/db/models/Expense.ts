import { Schema, model } from 'mongoose'

const ExpenseSchema = new Schema(
  {
    title: String,
    description: String,
    amount: Number,
    startDate: String,
    endDate: String,
    categories: [String],
    accountId: String,
    userId: String,
  },
  {
    timestamps: true,
  },
)

const ExpenseModel = model('Expense', ExpenseSchema)

export { ExpenseModel as Expense }
