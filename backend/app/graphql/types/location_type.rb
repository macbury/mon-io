module Types
  class LocationType < Types::BaseObject
    field :id, ID, null: false
    field :full_address, String, null: false
    field :name, String, null: false
    field :city, String, null: false
    field :country, String, null: false
    field :postcode, String, null: true
    field :lat, Float, null: false
    field :lng, Float, null: false
  end
end
