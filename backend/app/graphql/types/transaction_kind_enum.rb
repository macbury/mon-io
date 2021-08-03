module Types
  class TransactionKindEnum < BaseEnum
    graphql_name 'TransactionCategoryKind'

    value 'Income', value: 'income'
    value 'Saving', value: 'saving'
    value 'ExpenseOrTax', value: 'expense_or_tax'
    value 'IncomeOrSaving', value: 'income_or_saving'
    value 'Expense', value: 'expense'
    value 'Tax', value: 'tax'
    value 'Withdraw', value: 'withdraw'
    value 'Deposit', value: 'deposit'
    value 'Loan', value: 'loan'
  end
end