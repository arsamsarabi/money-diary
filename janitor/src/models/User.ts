import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    sub: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

const UserModel = model('User', UserSchema)

export { UserModel as User }
