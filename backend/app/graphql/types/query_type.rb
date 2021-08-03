module Types
  class QueryType < Types::BaseObject
    field :me, UserType, null: true, description: 'Information about current user'
    field :users, [ProfileType], resolver: Resolvers::AllUsers

    field :imports, resolver: Resolvers::AllImports, description: 'List of csv imports'
    field :get_import, resolver: Resolvers::GetImport, description: 'Get import by id'

    field :all_categories, null: false, resolver: Resolvers::AllCategories, description: 'List of all categories'
    field :category_styles, CategoryStyleType, null: false

    field :get_receipt, null: true, resolver: Resolvers::GetReceipt, description: 'Find receipt by its id'
    field :pending_receipts, null: false, resolver: Resolvers::PendingReceipts, description: 'All pending receipts for current user'

    field :transactions, null: false, resolver: Resolvers::AllTransactions, description: 'List transactions'
    field :planned_transactions, null: false, resolver: Resolvers::AllPlannedTransactions, description: 'List not persisted planned transactions'
    field :get_transaction, resolver: Resolvers::GetTransaction, description: 'Get transaction', null: true

    field :get_location, resolver: Resolvers::GetLocation, description: 'Find location details based on its geo position', null: true

    field :summary, null: false, resolver: Resolvers::Summary
    field :get_budget, null: true, resolver: Resolvers::GetBudget

    field :series, resolver: Resolvers::AllSeries, null: false
    field :get_series, resolver: Resolvers::GetSeries, null: true

    field :exchange_rate, resolver: Resolvers::ExchangeRate, null: true

    field :map, resolver: Resolvers::GetMap, null: false
    field :about, AboutType, null: false
    field :nonce, resolver: Resolvers::NonceToken
    field :get_long_living_token, resolver: Resolvers::GetLongLivingToken
    field :balance, resolver: Resolvers::Balance

    def me
      context[:current_user]
    end

    def about
      AppInformation.instance.to_h
    end

    def category_styles
      CategoryStyle
    end
  end
end
