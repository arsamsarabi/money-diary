import { Schema, model } from 'mongoose'

const AccountSchema = new Schema(
  {
    name: String,
    userId: String,
  },
  {
    timestamps: true,
  },
)

const AccountModel = model('Account', AccountSchema)

export { AccountModel as Account }
