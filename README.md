# Expense Tracker

> Full stack expense tracking and budgeting application

👨🏻‍💻 Author: [Arsam Sarabi](http://arsam.io)

- Track your Expenses
- Review your Accounts
- Set Budgets
- Plan your Savings

## Build using:

### Backend

- TypeScript
- Nodejs/ Expressjs
- apollo-server-express
- MongoDB/ Mongoose

### Frontend

- Vue js
- VueX
- Vue Router
- SCSS

## How to run the app locally

Firstly, You need to have an instance of MongoDB running. I recommend using [Docker](https://www.docker.com/get-started), See [this web page](https://cloudnweb.dev/2019/11/how-to-run-mongodb-as-a-docker-container-in-development/) for how-to(s) on running local [MongoDB in Docker](https://hub.docker.com/_/mongo).

> There is also a short version of it [here](https://github.com/arsamsarabi/expense-tracker/blob/master/back/README.md)

Once you have a DB running, look into the `front` and `back` folders. Copy & paste `.env.example` files and renames them to `.env`.
In the backend the `DB_URL` could be something like `mongodb://localhost:27017/expense-tracker`

For the frontend, at the time of writing this, there is no user registration/ authentication yet. You need to manually register a user in your database and copy & paste the user ID in the `.env` file for the app to work correctly. [Robo T3](https://robomongo.org/) is a great tool for interfacing with MongoDB.

With any luck, you should now be able to run `yarn install && yarn dev` in the `back` and `yarn install and yarn serve` in the `front`
