module Geo
  class ReverseGeocode < Service
    NEAR_LOCATION_IN_METERS = 30

    def initialize(lat:, lng:)
      @lat = lat
      @lng = lng
    end

    def call
      return near_location if near_location

      Rails.logger.info "Query: #{api_query_url}"
      place = response&.dig('features', 0, 'properties')&.symbolize_keys
      return unless place

      place_lng, place_lat = response.dig('features', 0, 'geometry', 'coordinates')

      address = place[:address].symbolize_keys
      id = plus_code.encode(place_lat, place_lng)

      Location.find_or_initialize_by(id: id) do |location|
        location.id = id
        location.lat = place_lng
        location.lng = place_lat
        location.category = place[:type]
        location.name = place[:name] || address[:road] || address[:suburb]
        location.suburb = address[:suburb] || address[:residential] || address[:neighbourhood] || address[:city_district] || address[:hamlet]
        location.full_address = place[:display_name]
        location.city = address[:city] || address[:village] || address[:state]
        location.postcode = address[:postcode]
        location.country = address[:country_code]
        location.save!
        location
      end
    end

    private

    attr_reader :lat, :lng

    def near_location
      @near_location ||= Location.within(NEAR_LOCATION_IN_METERS, units: :meters, origin: [lat, lng]).first
    end

    def response
      @response ||= HTTParty.get(api_query_url)
    rescue StandardError => e
      Rails.logger.error "ReverseGeocode: Could not fetch #{api_query_url}: #{e}"
      nil
    end

    def plus_code
      @plus_code ||= PlusCodes::OpenLocationCode.new
    end

    def api_query_url
      "https://nominatim.openstreetmap.org/reverse?lat=#{lat}&lon=#{lng}&format=geojson"
    end
  end
end