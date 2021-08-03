module Converter
  # Extract text from passed file
  class Txt < Service
    include ActionView::Helpers::SanitizeHelper

    use Converter::OutlookToHtml, as: :outlook_to_html
    use Converter::EmlToHtml, as: :eml_to_html

    attr_reader :file

    def initialize(file)
      @file = file
    end

    def call
      if pdf?
        tempfile.write(extract_pdf)
      elsif msg?
        tempfile.write(extract_msg)
      elsif eml?
        tempfile.write(extract_eml)
      else
        tempfile.write(extract_ocr)
      end
      tempfile.flush

      tempfile
    end

    private

    def tempfile
      @tempfile ||= Tempfile.new(['content', '.txt'])
    end

    def extract_pdf
      reader = PDF::Reader.new(file)
      cleanup reader.pages.map(&:text).join("\n")
    end

    def extract_msg
      cleanup strip_tags(outlook_to_html(file))
    end

    def extract_eml
      cleanup strip_tags(eml_to_html(file))
    end

    def extract_ocr
      cleanup Converter::ImageToPdf.new(file).content
    end

    def cleanup(text)
      text.split("\n").map(&:strip).reject(&:empty?).join("\n")
    end

    def pdf?
      extname.ends_with?('pdf')
    end

    def eml?
      extname.ends_with?('eml')
    end

    def msg?
      extname.ends_with?('msg')
    end

    def extname
      @extname ||= File.extname(file.path)
    end
  end
end