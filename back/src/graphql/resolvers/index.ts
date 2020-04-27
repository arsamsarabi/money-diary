import merge from 'lodash.merge'

import { AccountResolvers } from './Account.resolvers'
import { ExpenseResolvers } from './Expense.resolvers'
import { IncomeResolvers } from './Income.resolvers'
import { UserResolvers } from './User.resolvers'

const resolvers = merge(AccountResolvers, ExpenseResolvers, IncomeResolvers, UserResolvers)

export default resolvers
