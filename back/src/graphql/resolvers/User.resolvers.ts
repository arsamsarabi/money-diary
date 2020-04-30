import { Account, User } from '../../db'

const queries = {}

const mutations = {
  me: async (_: unknown, { user }: any) => {
    const result = await User.findOne({ sub: user.sub })
    if (result) return result
    const newUser = new User(user)
    return await newUser.save()
  },
  updateUser: async (_: unknown, { user }: any) => {
    return await User.findOneAndUpdate({ sub: user.sub }, user, {
      new: true,
    })
  },
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
  User: {
    accounts: async ({ _id }: any) => await Account.find({ userId: _id }),
  },
}

export { resolvers as UserResolvers }
