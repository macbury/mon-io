module Urls
  ##
  # Normalize the passed URL:
  # - Make sure that the URL passed as argument has an http:// or https://scheme.
  # - If the URL contains non-ascii characters, convert to ASCII using punycode
  # (see http://en.wikipedia.org/wiki/Internationalized_domain_name)
  #
  # Receives as argument an URL string.
  #
  # The algorithm for scheme manipulations performed by the method is:
  # - If the URL has no scheme it is returned prepended with http://
  # - If the URL has a feed: or feed:// scheme, it is removed and an http:// scheme added if necessary.
  # For details about this uri-scheme see http://en.wikipedia.org/wiki/Feed_URI_scheme
  # - If the URL has an http:// or https:// scheme, it is returned untouched.
  #
  # If a nil or empty string is passed, returns nil.
  class Normalize < Service
    use Strip, as: :strip_url

    def initialize(url, base_url: nil)
      @url = url
      @base_url = base_url
    end

    def call
      uri = URI.parse(url.strip)

      # resolve (protocol) relative URIs
      if uri.relative?
        base_uri = URI.parse(base_url.strip)
        scheme = base_uri.scheme || 'http'
        uri = URI.join("#{scheme}://#{base_uri.host}", uri)
      end

      strip_url(uri.to_s)
    rescue URI::InvalidURIError
      url
    end

    private

    attr_reader :url, :base_url
  end
end