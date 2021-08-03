module Types
  class LocationSummaryType < BaseObject
    field :id, ID, null: false
    field :location, LocationType, null: false
    field :amount, MoneyType, null: false

    def id
      object[:location].id
    end
  end
end
