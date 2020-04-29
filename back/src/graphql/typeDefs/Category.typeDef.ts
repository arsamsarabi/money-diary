import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Category {
    id: String!
    label: String!
    icon: String!
    color: String!
    userId: String!
    expensesSum: Float!
    recurringSum: Float!
  }

  input CategoryInput {
    id: String
    label: String
    icon: String
    color: String
    userId: String!
  }

  extend type Query {
    getMyCategories(userId: String): [Category!]!
  }

  extend type Mutation {
    addCategory(newCategory: CategoryInput): Category!
    updateCategory(categoryToUpdate: CategoryInput): Category!
    deleteCategory(categoryToDelete: CategoryInput): Category!
  }
`

export { typeDef as Category }
