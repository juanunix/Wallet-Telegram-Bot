import moment from 'moment'
import currencyFormatter from 'currency-formatter'

import { formatVerboseUser } from './verboseUser'

export const generateReceipt = (expense) => {
  const receipt = [
    `Ticket #${expense.code}`,
    '-',
    `<strong>${expense.description}</strong>`,
    `(${expense.cost > 0 ? 'CREDIT' : 'EXPENSE'})`,
    currencyFormatter.format(Math.abs(expense.cost), { code: 'BRL' }),
    '',
    `added on ${moment(expense.date).format('llll')}`,
    `by ${formatVerboseUser(expense.addedBy)}`,
  ]
  if (expense.tags && expense.tags.length) {
    receipt.push(expense.tags.join(' '))
  }
  if (expense.location && expense.location.name && expense.location.name.length) {
    receipt.push('')
    receipt.push(`Bought @ ${expense.location.name}`)
  }
  return receipt.join('\n')
}