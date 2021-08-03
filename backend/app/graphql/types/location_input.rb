module Types
  class LocationInput < BaseInputObject
    description 'Geo location on planet earth'
    argument :lat, Float, 'Latitute', required: true
    argument :lng, Float, 'Longnitude', required: true
  end
end
