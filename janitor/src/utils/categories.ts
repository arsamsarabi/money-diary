import { Category } from '../../../back/src/db'

const genericCategories = [
  {
    userId: 'generic',
    label: 'General',
    icon: 'question',
    color: '#4b6584',
  },
  {
    userId: 'generic',
    label: 'Utilities',
    icon: 'lightbulb',
    color: '#474787',
  },
  {
    userId: 'generic',
    label: 'Charity',
    icon: 'ribbon',
    color: '#e84393',
  },
  {
    userId: 'generic',
    label: 'Dining out',
    icon: 'wine-glass',
    color: '#eb3b5a',
  },
  {
    userId: 'generic',
    label: 'Entertainment',
    icon: 'mask',
    color: '#0984e3',
  },
  {
    userId: 'generic',
    label: 'Expenses',
    icon: 'dollar-sign',
    color: '#8e44ad',
  },
  {
    userId: 'generic',
    label: 'Family',
    icon: 'heart',
    color: '#fc5c65',
  },
  {
    userId: 'generic',
    label: 'Finances',
    icon: 'money-bill',
    color: '#1abc9c',
  },
  {
    userId: 'generic',
    label: 'Car',
    icon: 'car',
    color: '#f53b57',
  },
  {
    userId: 'generic',
    label: 'Groceries',
    icon: 'shopping-basket',
    color: '#fa8231',
  },
  {
    userId: 'generic',
    label: 'Holidays',
    icon: 'cocktail',
    color: '#e84393',
  },
  {
    userId: 'generic',
    label: 'Personal care',
    icon: 'gift',
    color: '#12CBC4',
  },
  {
    userId: 'generic',
    label: 'Shopping',
    icon: 'tags',
    color: '#0fb9b1',
  },
  {
    userId: 'generic',
    label: 'Transport',
    icon: 'taxi',
    color: '#f7b731',
  },
]

export const populateCategories = () => {
  for (let i = 0; i < genericCategories.length; i++) {
    const newCategory = new Category(genericCategories[i])
    newCategory.save().then((res: any) => {
      console.log(res)
    })
  }
}
