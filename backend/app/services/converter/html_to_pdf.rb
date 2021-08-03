module Converter
  class HtmlToPdf < Service
    def initialize(html_path, pdf_name)
      @html_path = File.absolute_path(html_path)
      @pdf_name = pdf_name
    end

    def call
      @temp_file = Tempfile.new(['document', '.pdf'])
      Rails.logger.info 'Converter::HtmlToPdf.render ' + wkhtmltopdf.command(options)

      begin
        Headless.ly do
          Rails.logger.info wkhtmltopdf.run(options)
        end
      rescue Terrapin::ExitStatusError => e
        throw e unless File.exist?(@temp_file.path) # Sometimes wkhtmltopdf generates pdf but returns error status 1
      end

      @temp_file
    end

    private

    attr_accessor :html_path, :pdf_name, :temp_file

    def options
      {
        in: Shellwords.escape(html_path),
        out: Shellwords.escape(temp_file.path)
      }
    end

    def wkhtmltopdf
      @wkhtmltopdf ||= Terrapin::CommandLine.new(wkhtmltopdf_bin, '--load-error-handling ignore --load-media-error-handling ignore --javascript-delay 1000 :in :out')
    end

    def pdf_extname
      File.extname(pdf_name)
    end

    def pdf_base_name
      File.basename(pdf_name, pdf_extname)
    end

    def wkhtmltopdf_bin
      ENV.fetch('WKHTMLTOPDF_BIN_PATH', 'wkhtmltopdf')
    end
  end
end