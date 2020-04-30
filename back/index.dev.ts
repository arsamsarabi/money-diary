import chalk from 'chalk'
import 'dotenv/config'
import './src/db/connection'
import './src/server/server'

// import { populateCategories } from './src/utils/categories'
;(() => {
  // populateCategories()
  console.log(chalk.bgHex('#182C61').hex('#f1f1f1')(` 🚧  Dev server starting up!  🚧 `))
})()
