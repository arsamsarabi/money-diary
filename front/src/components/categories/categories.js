import 'vue-awesome/icons/lightbulb'
import 'vue-awesome/icons/ribbon'
import 'vue-awesome/icons/wine-glass'
import 'vue-awesome/icons/mask'
import 'vue-awesome/icons/dollar-sign'
import 'vue-awesome/icons/heart'
import 'vue-awesome/icons/money-bill'
import 'vue-awesome/icons/universal-access'
import 'vue-awesome/icons/infinity'
import 'vue-awesome/icons/gift'
import 'vue-awesome/icons/cocktail'
import 'vue-awesome/icons/tag'
import 'vue-awesome/icons/taxi'

export const defaultCategories = [
  {
    id: '1',
    label: 'Utilities',
    icon: 'lightbulb',
    color: '#6c5ce7',
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
    label: 'General',
    icon: 'universal-access',
    color: '#4b6584',
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
