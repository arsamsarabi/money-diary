import { gql } from 'apollo-server-express'

import { Account } from './Account.typeDef'
import { Expense } from './Expense.typeDef'
import { Income } from './Income.typeDef'
import { User } from './User.typeDef'

const Query = gql`
  type Query {
    _empty: String
  }
`
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`

export default [Query, Mutation, Account, Expense, Income, User]
