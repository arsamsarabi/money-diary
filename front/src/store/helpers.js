import { defaultCategories } from '../utils/categories'

export const floatify = number => parseFloat(number).toFixed(2)

export const sortBySum = categoryArray => categoryArray.sort((a, b) => b.sum - a.sum)

export const getExpenditureSum = expenses => {
  const categorisedExpenses = [...defaultCategories]
  const categorisedRecurring = [...defaultCategories]

  // For each expense in the array of expenses
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i]
    const isRecurring = expense.recurring

    // For each category tagged on the expense
    for (let j = 0; j < expense.categories.length; j++) {
      if (isRecurring) {
        const category = categorisedRecurring.find(cat => cat.id === expense.categories[j])
        category.sum = floatify(parseFloat(category.sum) + parseFloat(expense.amount))
      } else {
        const category = categorisedExpenses.find(cat => cat.id === expense.categories[j])
        category.sum = floatify(parseFloat(category.sum) + parseFloat(expense.amount))
      }
    }
  }

  console.log(
    'categorisedExpenses',
    categorisedExpenses.map(category => [category.label, category.sum]),
  )
  console.log(
    'categorisedRecurring',
    categorisedRecurring.map(category => [category.label, category.sum]),
  )

  return [sortBySum(categorisedExpenses), sortBySum(categorisedRecurring)]
}
