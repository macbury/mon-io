module Resolvers
  class AllTransactions < Base
    include SearchObject.module(:graphql)

    OrderEnum = GraphQL::EnumType.define do
      name 'TransactionOrder'

      value 'Newest'
      value 'Oldest'
    end

    TransactionImport = GraphQL::EnumType.define do
      name 'TransactionImport'

      value 'All', value: :all
      value 'Imported', value: :imported
      value 'NotImported', value: :not_imported
    end

    TransactionReceipt = GraphQL::EnumType.define do
      name 'TransactionReceipt'

      value 'All', value: :all
      value 'Attached', value: :attached
      value 'Without', value: :without
    end

    TransactionSeries = GraphQL::EnumType.define do
      name 'TransactionSeries'

      value 'All', value: :all
      value 'Repeating', value: :Repeating
      value 'Normal', value: :normal
    end

    scope do
      Transaction.for_user(current_user).is_not_blueprint.preload_associations_lazily.distinct
    end

    type Types::TransactionConnectionType, null: false

    option(:month, type: Types::TimeArgument, required: false) { |scope, value| scope.for_month(value) }
    option(:from_date, type: Types::TimeArgument, required: false) { |scope, value| scope.where('date >= ?', value.at_beginning_of_day) }
    option(:to_date, type: Types::TimeArgument, required: false) { |scope, value| scope.where('date <= ?', value.end_of_day) }
    option(:order, type: OrderEnum, default: 'Newest', required: false)
    option(:filter, type: Types::TransactionKindEnum, required: false)
    option(:query, type: String, required: false) { |scope, value| value.present? ? scope.search_by_notes(value) : scope }
    option(:category_ids, type: [ID], required: false) do |scope, category_ids|
      category_ids ? scope.where(category_id: category_ids) : scope
    end
    option(:import_id, type: ID, required: false) { |scope, import_id| import_id ? scope.where(import_id: import_id) : scope }
    option(:import, type: TransactionImport, default: :all, required: false)
    option(:receipt, type: TransactionReceipt, default: :all, required: false)
    option(:series, type: TransactionSeries, default: :all, required: false)

    # def results
    #   binding.pry
    #   super
    # end

    def apply_series_with_all(scope)
      scope
    end

    def apply_receipt_with_all(scope)
      scope
    end

    def apply_series_with_repeating(scope)
      scope.is_in_series
    end

    def apply_series_with_normal(scope)
      scope.is_not_in_series
    end

    def apply_receipt_with_attached(scope)
      scope.joins(:receipt).where.not(receipts: { id: nil })
    end

    def apply_receipt_with_without(scope)
      scope.left_outer_joins(:receipt).where(receipts: { id: nil })
    end

    def apply_import_with_all(scope)
      scope
    end

    def apply_import_with_imported(scope)
      scope.where.not(import_id: nil)
    end

    def apply_import_with_not_imported(scope)
      scope.where(import_id: nil)
    end

    def apply_order_with_newest(scope)
      scope.order 'date DESC'
    end

    def apply_order_with_oldest(scope)
      scope.order 'date ASC'
    end

    def apply_filter_with_expense_or_tax(scope)
      scope.expense_or_tax
    end

    def apply_filter_with_income_or_saving(scope)
      scope.income_or_saving
    end

    def apply_filter_with_expense(scope)
      scope.expense
    end

    def apply_filter_with_income(scope)
      scope.income
    end
  end
end