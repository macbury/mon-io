module Auth
  class VerifyApi < Service
    def initialize(request)
      @request = request
    end

    def call
      return true unless client_version

      if server_version != client_version
        Rails.logger.error "Server version is: #{server_version} and client version is: #{client_version}"
        false
      else
        true
      end
    end

    private

    attr_reader :request

    def client_version
      @client_version ||= request.headers['MonioClientVersion']
    end

    def server_version
      AppInformation.instance.version
    end
  end
end