require 'mail'
module Converter
  # Convert apple/thunderbird .eml files to html
  class EmlToHtml < EmailBase
    private

    def message
      @message ||= ::Mail.read(msg_path)
    end

    def fallback_content
      message.body&.decoded
    end
  end
end