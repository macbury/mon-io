module Download
  # Follow all redirects for provider url
  class ResolveUrl < Service
    use Urls::Validate, as: :valid_url
    use Urls::Normalize, as: :normalize_url

    def self.internet
      Thread.current[:async_job_internet] ||= Async::HTTP::Internet.new
    end

    def initialize(url, limit: 10)
      @url = url
      @limit = limit
    end

    def call
      Rails.cache.fetch(['proxy', 'resolve', url], expires_in: 6.hours) do
        info "Finding final url for: #{url}"

        follow(url)
      end
    rescue Async::TimeoutError, SocketError, URI::InvalidURIError, Async::Stop => e
      raise ServiceFailure, e.to_s
    end

    private

    attr_reader :url, :limit

    def follow(next_url)
      raise ServiceFailure, 'Redirect limit hit!' if limit <= 0
      raise ServiceFailure, "Invalid url: #{next_url}" unless valid_url(next_url)

      @limit -= 1

      info "Fetching head for: #{next_url}"
      resolved_url = head_for(next_url)

      if resolved_url
        resolved_url = normalize_url(resolved_url, base_url: next_url)
        info "Found next url to check: #{resolved_url}"
        follow(resolved_url)
      else
        info "Final url is: #{next_url}"
        next_url
      end
    end

    def head_for(input_url)
      response = internet.head(input_url)
      response.read
      response.headers['location'] unless response.status == 404
    rescue EOFError
      response.headers['location'] if response
    ensure
      response&.close
    end
  end
end