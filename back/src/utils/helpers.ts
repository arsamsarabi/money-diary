export const getExpenditureSum = (expenses: any, categories: any) => {
  const result = categories.map((category: any): any => {
    const tempCat = {
      ...category._doc,
      id: category._doc._id,
      recurringSum: 0,
      expensesSum: 0,
    }
    const relevantExpenses = expenses.filter((expense: any) =>
      expense.categories.includes(tempCat._id),
    )
    for (let i = 0; i < relevantExpenses.length; i++) {
      if (relevantExpenses[i].recurring) {
        tempCat.recurringSum += relevantExpenses[i].amount
      } else {
        tempCat.expensesSum += relevantExpenses[i].amount
      }
    }
    return tempCat
  })

  return result
}
