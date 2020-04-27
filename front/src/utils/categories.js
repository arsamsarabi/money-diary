export const defaultCategories = [
  {
    id: '0',
    label: 'General',
    icon: 'universal-access',
    color: '#4b6584',
  },
  {
    id: '1',
    label: 'Utilities',
    icon: 'lightbulb',
    color: '#474787',
  },
  {
    id: '2',
    label: 'Charity',
    icon: 'ribbon',
    color: '#e84393',
  },
  {
    id: '3',
    label: 'Dining out',
    icon: 'wine-glass',
    color: '#eb3b5a',
  },
  {
    id: '4',
    label: 'Entertainment',
    icon: 'mask',
    color: '#0984e3',
  },
  {
    id: '5',
    label: 'Expenses',
    icon: 'dollar-sign',
    color: '#8e44ad',
  },
  {
    id: '6',
    label: 'Family',
    icon: 'heart',
    color: '#fc5c65',
  },
  {
    id: '7',
    label: 'Finances',
    icon: 'money-bill',
    color: '#1abc9c',
  },
  {
    id: '8',
    label: 'Car',
    icon: 'car',
    color: '#f53b57',
  },
  {
    id: '9',
    label: 'Groceries',
    icon: 'infinity',
    color: '#fa8231',
  },
  {
    id: '10',
    label: 'Holidays',
    icon: 'cocktail',
    color: '#e84393',
  },
  {
    id: '11',
    label: 'Personal care',
    icon: 'gift',
    color: '#12CBC4',
  },
  {
    id: '12',
    label: 'Shopping',
    icon: 'tag',
    color: '#0fb9b1',
  },
  {
    id: '13',
    label: 'Transport',
    icon: 'taxi',
    color: '#f7b731',
  },
]

export const getOneCategory = (field, value) => defaultCategories.find(cat => cat[field] === value)
