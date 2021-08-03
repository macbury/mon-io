require 'mapi/msg'

module Converter
  # Convert Outlook .msg file to html
  class OutlookToHtml < EmailBase
    private

    def message
      @message ||= Mapi::Msg.open(File.absolute_path(msg_path), 'rb+').to_mime
    end
  end
end