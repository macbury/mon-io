module Favicon
  class FromWebpage < Service
    use Download::Get, as: :download
    use Urls::Normalize, as: :normalize_url

    ICON_SELECTORS = [
      'link[rel="SHORTCUT ICON"]',
      'link[rel="shortcut icon"]',
      'link[type="image/x-icon"]',
      'link[rel="fluid-icon"]'
    ].freeze

    APPLE_TOUCH_SELECTORS = [
      'link[rel="apple-touch-icon"]',
      'link[rel="icon"]'
    ].freeze

    PNG_EXTENSION = /\.png/i.freeze
    ICO_EXTENSION = /\.ico/i.freeze

    def initialize(url)
      @url = url
    end

    def call
      Rails.cache.fetch(['favicon/', url], expires_in: 30.days) do
        find_candidates
      end
    end

    private

    attr_reader :url

    def find_candidates
      candidates = []
      candidates += apple_touch_urls
      candidates += sort_candidates(html_candidate_urls)
      candidates << normalize_url('/favicon.png', base_url: url)
      candidates << normalize_url('/favicon.ico', base_url: url)

      info "Current candidates: #{candidates}"
      candidates.uniq!

      until candidates.empty?
        begin
          favicon_url = candidates.shift
          info "Checking: #{favicon_url}"
          download(url: favicon_url)

          return favicon_url
        rescue ServiceFailure
          next
        end
      end

      nil
    end

    def document
      @document ||= Nokogiri::HTML(download(url: url, html: true))
    end

    def html_candidate_urls
      @html_candidate_urls ||= document.css(ICON_SELECTORS.join(',')).map { |node| normalize_url(node[:href], base_url: url) }
    end

    def apple_touch_urls
      @apple_touch_urls ||= document.css(APPLE_TOUCH_SELECTORS.join(',')).sort_by { |node| node[:sizes]&.to_i || 0 }.map do |node|
        normalize_url(node[:href], base_url: url)
      end.reverse
    end

    def sort_candidates(candidates)
      candidates.sort_by do |href|
        if href.match(PNG_EXTENSION)
          0
        elsif href.match(ICO_EXTENSION)
          1
        else
          2
        end
      end.reverse
    end
  end
end