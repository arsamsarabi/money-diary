interface Category {
  id: string
  userId: string
  label: string
  color: string
  icon: string
  expensesSum?: number
  recurringSum?: number
}

export const getExpenditureSum = (expenses: any, categories: any[]): Category[] => {
  const result: Category[] = categories.map(
    (category: Category): Category => {
      const tempCat: Category = category
      const relevantExpenses: any[] = expenses.filter((expense: any) =>
        expense.categories.includes(tempCat.id),
      )
      for (let i = 0; i < relevantExpenses.length; i++) {
        if (relevantExpenses[i].recurring) {
          tempCat.recurringSum
            ? (tempCat.recurringSum += relevantExpenses[i].amount)
            : (tempCat.recurringSum = relevantExpenses[i].amoun)
        } else {
          tempCat.expensesSum
            ? (tempCat.expensesSum += relevantExpenses[i].amount)
            : (tempCat.expensesSum = relevantExpenses[i].amoun)
        }
      }
      return tempCat
    },
  )

  return result
}
