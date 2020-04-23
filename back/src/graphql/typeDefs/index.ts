import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Expense {
    id: String
    title: String
    description: String
    amount: Float
    startDate: String
    endDate: String
    accountId: String
    userId: String
  }

  type Account {
    id: String
    name: String
    userId: String
    expenses: [Expense]!
  }

  type User {
    id: String
    name: String
    accounts: [Account]!
  }

  type Query {
    me(userId: String): User
  }

  input NewAccount {
    name: String
    userId: String
  }

  input NewExpense {
    title: String
    description: String
    amount: Float
    startDate: String
    endDate: String
    accountId: String
    userId: String
  }

  type Mutation {
    addAccount(newAccount: NewAccount): Account
    addExpense(newExpense: NewExpense): Expense
  }
`

export default [typeDefs]
