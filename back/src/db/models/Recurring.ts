import { Schema, model } from 'mongoose'

const RecurringSchema = new Schema(
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

const RecurringModel = model('Recurring', RecurringSchema)

export { RecurringModel as Recurring }
