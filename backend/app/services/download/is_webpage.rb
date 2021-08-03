module Download
  # Check if url content type is html
  class IsWebpage < Service
    HTML_CONTENT_TYPE = /html/i.freeze

    def initialize(url)
      @url = url
    end

    def call
      response.read
      Rails.logger.info "Url #{url} content type is #{content_type}"
      html?
    rescue EOFError
      html?
    ensure
      response.close if @response
    end

    private

    attr_reader :url, :headers, :html, :timeout

    def content_type
      @content_type ||= response.headers['content-type'] || 'unknown'
    end

    def html?
      content_type.match(HTML_CONTENT_TYPE).present?
    end

    def response
      @response ||= internet.head(url)
    end
  end
end