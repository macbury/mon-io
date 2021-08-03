module Urls
  # Check if passed url is valid
  class Validate < Service
    attr_reader :url

    def initialize(url)
      @url = url
    end

    def call
      uri&.scheme == 'https' || uri&.scheme == 'http'
    rescue URI::InvalidURIError
      false
    end

    private

    def uri
      @uri ||= URI.parse(url)
    end
  end
end