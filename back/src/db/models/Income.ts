import { Schema, model } from 'mongoose'

const IncomeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: String,
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
    daysPerWeek: {
      type: Number,
    },
    payer: {
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

const IncomeModel = model('Income', IncomeSchema)

export { IncomeModel as Income }
