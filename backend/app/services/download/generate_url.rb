module Download
  class GenerateUrl < Service
    attr_reader :record, :refresh_token

    def initialize(record, refresh_token)
      @record = record
      @refresh_token = refresh_token
    end

    def call
      Rails.application.routes.url_helpers.download_url(
        data: signed_data
      )
    end

    private

    def signed_data
      TokenScopes.download_resource(refresh_token, record)
    end
  end
end