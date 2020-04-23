import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  },
)

const UserModel = model('User', UserSchema)

export { UserModel as User }
