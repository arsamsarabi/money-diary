import 'dotenv/config'
import chalk from 'chalk'
import mongoose from 'mongoose'

import { fakePopulateDB } from './utils/faker'

const { DB_URL = '' } = process.env

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((err: any) => console.error(err))
  .then(() => {
    console.log(`Database: ${DB_URL}`)
    console.log(chalk.bgHex('#16a085').hex('#2c3e50')(` 🚧  Janitor getting to work!  🚧 `))
    fakePopulateDB('5eab0003c08ee666c672571d')
  })
