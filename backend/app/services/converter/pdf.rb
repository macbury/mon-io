module Converter
  # Try to convert file into pdf
  class Pdf < Service
    use Converter::ImageToPdf, as: :image_to_pdf
    use Converter::OutlookToHtml, as: :outlook_to_html
    use Converter::HtmlToPdf, as: :html_to_pdf
    use Converter::EmlToHtml, as: :eml_to_html

    def initialize(io)
      @io = io
    end

    def call
      return pdf_copy if pdf?

      generate_pdf(io, 'scan.pdf')
    end

    private

    attr_reader :io

    def pdf_copy
      @pdf_copy ||= begin
        file_name_path = Dir::Tmpname.create(['original', '.pdf']) {}
        FileUtils.cp(io.path, file_name_path)
        File.new(file_name_path)
      end
    end

    def generate_pdf(original, original_name)
      if msg?
        convert_msg_to_pdf(original, original_name)
      elsif eml?
        convert_eml_to_pdf(original, original_name)
      else
        convert_image_to_pdf(original)
      end
    end

    def convert_image_to_pdf(original)
      Rails.logger.info "Converting image #{original.path} to pdf"
      image_to_pdf(original)
    end

    def convert_msg_to_pdf(original, original_name)
      Rails.logger.info "Converting Outlook Msg #{original.path} to pdf"
      content = outlook_to_html(original)
      Tempfile.create(['msg', '.html'], encoding: content.encoding) do |tempfile|
        tempfile.write content
        tempfile.flush

        Rails.logger.info "Converting HTML to pdf: #{tempfile.path}"
        return html_to_pdf(tempfile.path, original_name)
      end
    end

    def convert_eml_to_pdf(original, original_name)
      Rails.logger.info "Converting Eml #{original.path} to pdf"
      content = eml_to_html(original)
      Tempfile.create(['eml', '.html'], encoding: content.encoding) do |tempfile|
        tempfile.write content
        tempfile.flush

        Rails.logger.info "Converting HTML to pdf: #{tempfile.path}"
        return html_to_pdf(tempfile.path, original_name)
      end
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
      @extname ||= File.extname(io.path)
    end
  end
end