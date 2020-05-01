import mongoose from 'mongoose'

export const dropCollections = () => {
  const connection = mongoose.connection
  return new Promise((resolve, reject) => {
    connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      if (collections) {
        for (let i = 0; i < collections.length; i++) {
          if (collections[i].name !== 'users') {
            mongoose.connection.db.dropCollection(collections[i].name, (err) => {
              if (err) {
                console.log(err)
                reject(err)
              } else {
                console.log(`${collections[i].name} dropped`)
              }
            })
          }
        }
        resolve('Collections destroyed!')
      }
    })
  })
}
