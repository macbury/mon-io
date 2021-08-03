module Resolvers
  class CategoriesNextMonth < Base
    use Budgets::Projected, as: :project_next_month

    description 'Projects spendings/incomes calculating average transaction amounts for last 3 months '
    type [Types::CategorySummaryType], null: false

    def resolve
      project_next_month(
        user: current_user,
        date: object
      ).map do |category, amount|
        zero = 0.to_money(category.currency)
        { category: category, positive: amount.positive? ? amount : zero, negative: amount.negative? ? amount : zero }
      end
    end
  end
end