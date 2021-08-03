module Urls
  class Strip < Service
    # Strip URL string of leading and trailing whitespaces and double quotes
    def initialize(url)
      @url = url
    end

    def call
      # Remove whitespaces at beginning/end of string
      stripped_url = url.strip

      # If the url begins or ends with mismatched " characters, remove them, otherwise Addressable gets confused
      stripped_url.sub! /\A"+/, ''
      stripped_url.sub! /"+\Z/, ''

      # If there are whitespaces after a " character at the beginning of before a " at the end, remove them as well
      stripped_url.strip
    end

    private

    attr_reader :url
  end
end