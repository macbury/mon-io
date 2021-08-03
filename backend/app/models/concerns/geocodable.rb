module Geocodable
  extend ActiveSupport::Concern

  included do
    acts_as_mappable lat_column_name: :lat,
                     lng_column_name: :lng

    belongs_to :location, optional: true

    after_create :assign_location!
  end

  def assign_location!
    self.location ||= Geo::ReverseGeocode.call(lat: lat, lng: lng) if lat && lng
    save
  end
end