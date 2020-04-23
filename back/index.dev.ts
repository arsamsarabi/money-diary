import 'dotenv/config'

import './src/db/connection'

import * as services from './src/services'

;(async () => {
  const response = await services.getSummonerInfoByName()
  console.log(response)
})()
