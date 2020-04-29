import { Category } from '../../db'

const queries = {
  getMyCategories: async (_: any, { userId }: { userId: string }) =>
    await Category.find({ userId: userId || 'generic' }),
}

const mutations = {
  addCategory: async (_: unknown, { newCategory }: any) => {
    const category = new Category(newCategory)
    return await category.save()
  },
  updateCategory: async (_: unknown, { categoryToUpdate }: any) => {
    return await Category.findOneAndUpdate(
      { _id: categoryToUpdate.id, userId: categoryToUpdate.userId },
      categoryToUpdate,
      {
        new: true,
      },
    )
  },
  deleteCategory: async (_: unknown, { categoryToDelete }: any) => {
    return await Category.findOneAndDelete({
      _id: categoryToDelete.id,
      userId: categoryToDelete.userId,
    })
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
}

export { resolvers as CategoryResolvers }
