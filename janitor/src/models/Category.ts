import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#4b6584',
    },
    userId: {
      type: String,
      default: 'generic',
    },
  },
  {
    timestamps: true,
  },
)

const CategoryModel = model('Category', CategorySchema)

export { CategoryModel as Category }
