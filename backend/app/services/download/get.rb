module Download
  class Get < Service
    use ResolveUrl, as: :resolve_final_url
    use IsWebpage, as: :is_webpage

    def initialize(url:, html: false, timeout: 25)
      @url = url
      @html = html
      @timeout = timeout
    end

    def call
      require_html! if html

      response = internet.get(final_url)

      raise ServiceFailure, "Response status code is invalid: #{response.status}" unless response.success?

      response.read
    rescue Async::Stop, Async::TimeoutError, URI::InvalidURIError => e
      raise ServiceFailure, e.to_s
    ensure
      response&.close
    end

    private

    attr_reader :url, :headers, :html, :timeout

    def final_url
      @final_url ||= resolve_final_url(url)
    end

    def require_html!
      return if is_webpage(final_url)

      raise ServiceFailure, "Url #{final_url} is not a webpage!"
    end
  end
end