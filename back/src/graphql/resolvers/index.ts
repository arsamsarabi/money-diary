import merge from 'lodash.merge'

import { AccountResolvers } from './Account.resolvers'
import { CategoryResolvers } from './Category.resolvers'
import { ExpenseResolvers } from './Expense.resolvers'
import { IncomeResolvers } from './Income.resolvers'
import { UserResolvers } from './User.resolvers'

const resolvers = merge(
  AccountResolvers,
  CategoryResolvers,
  ExpenseResolvers,
  IncomeResolvers,
  UserResolvers,
)

export default resolvers
