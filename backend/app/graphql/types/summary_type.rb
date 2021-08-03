module Types
  class SummaryType < BaseObject
    use Transactions::TotalIncome, as: :calculate_income
    use Transactions::TotalExpenses, as: :calculate_expenses
    use Transactions::TotalLoans, as: :calculate_loans
    use Transactions::Difference, as: :calculate_difference

    description 'Summary for transactions'
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :categories, resolver: Resolvers::CategoriesSummary
    field :next_month, resolver: Resolvers::CategoriesNextMonth

    field :income, type: Types::MoneyType, null: false
    field :expense, type: Types::MoneyType, null: false
    field :difference, type: Types::MoneyType, null: false
    field :loans, type: Types::MoneyType, null: false

    def date
      object.at_beginning_of_month
    end

    def income
      calculate_income(user: current_user, date: object)
    end

    def expense
      calculate_expenses(user: current_user, date: object)
    end

    def difference
      calculate_difference(user: current_user, date: object)
    end

    def loans
      calculate_loans(user: current_user, date: object)
    end
  end
end
