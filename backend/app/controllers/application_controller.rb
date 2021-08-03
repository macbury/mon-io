class ApplicationController < ActionController::API
  extend Usable

  include ActionController::MimeResponds
  include ActionController::HttpAuthentication::Token::ControllerMethods

  attr_reader :refresh_token

  use Auth::ResourceWithToken, as: :auth_resource_with_token
  use Auth::AuthWithToken, as: :auth_with_token

  def authenticate!
    if params.key?(:token)
      Rails.logger.debug "Params Access token is: #{token_param}"
      @refresh_token = auth_with_token(token_param)
    else
      authenticate_with_http_token do |access_token, _options|
        Rails.logger.debug "Header Access token is: #{access_token}"
        @refresh_token = auth_with_token(access_token)
      end
    end
  end

  def authenticate_token!(scope)
    @refresh_token ||= auth_resource_with_token(token_param, scope)

    render status: :forbidden unless current_user
  end

  def current_user
    refresh_token ? refresh_token.user : super
  end

  def authenticate_user!
    authenticate!

    render status: :forbidden unless current_user
  end

  def token_param
    params.require(:token)
  end
end
