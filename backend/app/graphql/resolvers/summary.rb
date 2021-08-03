module Resolvers
  class Summary < Base
    type Types::SummaryType, null: false

    argument :date, Types::TimeArgument, required: true

    def resolve(date:)
      date
    end
  end
end