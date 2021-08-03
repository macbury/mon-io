module Types
  class CurrencyType < Types::BaseObject
    field :id, ID, null: false
    field :iso_code, String, null: false
    field :name, String, null: false
    field :symbol, String, null: false
    field :subunit_to_unit, Integer, null: false

    def id
      object.iso_code
    end
  end
end
