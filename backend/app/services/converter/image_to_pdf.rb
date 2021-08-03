module Converter
  class ImageToPdf < Service
    use Download::Tesseract, as: :models_path

    def initialize(image_path)
      @image_path = File.absolute_path(image_path)
    end

    def call
      convert.run(in: image_path, out: final_pdf.path)
      final_pdf
    end

    def content
      tesseract.to_s
    end

    private

    attr_accessor :image_path

    def lang
      ENV.fetch('TESSERACT_OCR_LANG')
    end

    def final_pdf
      @final_pdf ||= Tempfile.new(['out', '.pdf'])
    end

    def tesseract
      @tesseract ||= RTesseract.new(image_path, lang: lang, 'tessdata-dir': models_path)
    end

    def convert
      @convert ||= Terrapin::CommandLine.new('convert', '-auto-orient -density 50x50 -quality 60 -compress jpeg :in :out')
    end
  end
end