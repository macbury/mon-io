module Resolvers
  class GetMap < Base
    include SearchObject.module(:graphql)

    type [Types::LocationSummaryType], null: false

    scope do
      Transaction.shared_or_for_user(current_user)
                 .expense
                 .is_not_blueprint
                 .where.not(location_id: nil)
    end

    option(:category_ids, type: [ID], required: false) do |scope, category_ids|
      category_ids ? scope.where(category_id: category_ids) : scope
    end

    def resolve_with_support(args = {})
      self.params = args.to_h

      summary = {}

      results.find_each do |transaction|
        summary[transaction.location_id] ||= Money.new(0)
        summary[transaction.location_id] += transaction.exchanged_amount
      end

      locations = Location.where(id: summary.keys).index_by(&:id)

      summary.map do |location_id, amount|
        { amount: amount, location: locations[location_id] }
      end
    end
  end
end