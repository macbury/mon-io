module Resolvers
  class CategoriesSummary < Base
    include SearchObject.module(:graphql)

    scope do
      Transaction.for_user(current_user).for_month(object).lazy_preload(:category).is_not_blueprint
    end

    type [Types::CategorySummaryType], null: false

    option(:filter, type: Types::TransactionKindEnum, required: true)

    def apply_filter_with_expense(scope)
      scope.expense
    end

    def apply_filter_with_tax(scope)
      scope.tax
    end

    def apply_filter_with_saving(scope)
      scope.savings
    end

    def apply_filter_with_loan(scope)
      scope.loan
    end

    def apply_filter_with_expense_or_tax(scope)
      scope.expense_or_tax
    end

    def apply_filter_with_income_or_saving(scope)
      scope.income_or_saving
    end

    def apply_filter_with_income(scope)
      scope.income
    end

    def results
      present_categories = super.each_with_object({}) do |transaction, output|
        category = transaction.category
        amount = transaction.category_amount

        unless output[category]
          output[category] = {
            positive: 0.to_money(category.currency),
            negative: 0.to_money(category.currency)
          }
        end

        if amount.positive?
          output[category][:positive] += amount
        else
          output[category][:negative] += amount
        end
      end

      missing_category_ids = present_categories.keys.map(&:id)

      missing_categories = Category.for_user(current_user).not_archived.for_ids(missing_category_ids).send(filter).map do |category|
        { category: category, positive: 0.to_money(category.currency), negative: 0.to_money(category.currency) }
      end

      result = present_categories.map do |category, amounts|
        { category: category }.merge(amounts)
      end + missing_categories

      result.sort_by { |r| r[:category].name }
    end
  end
end