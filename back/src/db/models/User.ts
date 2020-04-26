import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    sub: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
)

const UserModel = model('User', UserSchema)

export { UserModel as User }
