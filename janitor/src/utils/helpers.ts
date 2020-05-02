import faker from 'faker'

const { sentences } = faker.lorem
const { number } = faker.random
const { past, between } = faker.date

export const descriptionGenerator = () => sentences(number(5))

export const dateGenerator = () => between(past(1), new Date())
