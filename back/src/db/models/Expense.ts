import { Schema, model } from 'mongoose'

const ExpenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: Date.now,
    },
    recurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    frequency: {
      type: String,
    },
    endDate: {
      type: String,
    },
    categories: {
      type: [String],
      required: true,
      default: ['0'],
    },
    payedTo: {
      type: String,
      required: false,
    },
    accountId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const ExpenseModel = model('Expense', ExpenseSchema)

export { ExpenseModel as Expense }
