module Download
  # Download tesseract model for languages
  class Tesseract < Service
    attr_reader :languages, :models_path

    def initialize(languages, models_path: nil)
      @languages = languages
      @models_path = models_path ? Pathname.new(models_path) : Rails.root.join('storage/tesserac/models')
    end

    def call
      FileUtils.mkdir_p models_path

      languages.each do |language_code|
        model_file_path = model_path(language_code)
        next if File.exist?(model_file_path)

        Rails.logger.info "Missing tesseract language model: #{language_code} and saving it into: #{model_file_path}"
        Down.download(github_model_url(language_code), destination: model_file_path)
      end

      models_path
    end

    private

    def model_path(language_code)
      models_path.join("#{language_code}.traineddata")
    end

    def github_model_url(language_code)
      "https://raw.githubusercontent.com/tesseract-ocr/tessdata_best/master/#{language_code}.traineddata"
    end
  end
end