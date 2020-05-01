import 'dotenv/config'
import chalk from 'chalk'
import mongoose from 'mongoose'

import { fakePopulateDB } from './faker'

const { DB_URL = '', USER_ID = '' } = process.env

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
    console.log(chalk.bgHex('#16a085').hex('#2c3e50')(' 🚧  Janitor getting to work!  🚧 '))
    fakePopulateDB(USER_ID)
  })
