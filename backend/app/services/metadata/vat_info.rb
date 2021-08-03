module Metadata
  # Use api provided http://ec.europa.eu/taxation_customs/vies/ to fetch company name and address using their vat number
  class VatInfo < Service
    SERVICE_WSDL = 'https://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl'.freeze

    def initialize(country_code:, vat_number:)
      @country_code = country_code
      @vat_number = vat_number
    end

    def call
      response = client.call(:check_vat, message: message).body.dig(:check_vat_response)
      valid = response[:valid]
      name = response[:name]
      address = response[:address]

      if valid
        { name: name.titleize, address: address.titleize }
      else
        false
      end
    end

    private

    attr_reader :country_code, :vat_number

    def client
      @client ||= Savon.client(wsdl: SERVICE_WSDL)
    end

    def message
      {
        countryCode: country_code,
        vatNumber: vat_number
      }
    end
  end
end