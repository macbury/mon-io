module Converter
  class EmailBase < Service
    def initialize(msg_path)
      @msg_path = msg_path
    end

    def call
      html || text || fallback_content
    end

    private

    attr_reader :msg_path

    def search_mime_type_part(parts, mime_type)
      return unless parts

      parts.each do |part|
        return part if part.content_type.starts_with?(mime_type)

        deep_part = search_mime_type_part(part.parts, mime_type)
        return deep_part if deep_part
      end

      nil
    end

    def html
      @html ||= search_mime_type_part(message.parts, 'text/html')&.body&.to_s
    end

    def text
      @text ||= search_mime_type_part(message.parts, 'text/plain')&.body&.to_s
    end

    def fallback_content
      nil
    end
  end
end