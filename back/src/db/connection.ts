import mongoose from 'mongoose'
import chalk from 'chalk'

const { DB_URL = '' } = process.env

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err))
  .then(() => {
    console.log(chalk.bgHex('#227093').hex('#f7f1e3')(` 🛠 ${DB_URL} 🛠 `))
    console.log(
      chalk.bgHex('#6F1E51').hex('#FDA7DF')(` 🛠 Successfully connected to the database! 🛠 `),
    )
  })
