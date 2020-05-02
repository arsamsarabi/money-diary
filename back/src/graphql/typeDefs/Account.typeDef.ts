import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Account {
    id: String!
    name: String!
    description: String
    userId: String!
    expenses: [Expense]!
    incomes: [Income]!
    expenditureSumTotal: Float
    expenditureSumMonth: Float
    expenditureSum30Days: Float
    incomeSumTotal: Float
    incomeSumMonth: Float
    incomeSum30Days: Float
  }

  input AccountInput {
    id: String
    name: String
    description: String
    userId: String!
  }

  extend type Query {
    getAccountsByUserId(userId: String): [Account]!
  }

  extend type Mutation {
    addAccount(newAccount: AccountInput): Account
    updateAccount(accountToUpdate: AccountInput): Account
    deleteAccount(id: String): Account
  }
`

export { typeDef as Account }
