module Resolvers
  class GetLocation < Base
    use Geo::ReverseGeocode, as: :reverse_geocode
    type Types::LocationType, null: true

    argument :location, Types::LocationInput, required: true

    def resolve(location:)
      reverse_geocode(location.to_h)
    end
  end
end