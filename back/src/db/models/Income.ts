import { Schema, model } from 'mongoose'

const IncomeSchema = new Schema(
  {
    title: String,
    description: String,
    amount: Number,
    date: String,
    recurring: Boolean,
    frequency: String,
    daysPerWeek: Number,
    accountId: String,
    userId: String,
  },
  {
    timestamps: true,
  },
)

const IncomeModel = model('Income', IncomeSchema)

export { IncomeModel as Income }
