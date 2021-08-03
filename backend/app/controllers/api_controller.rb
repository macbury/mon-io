class ApiController < ApplicationController
  use Auth::VerifyApi, as: :verify_api
  respond_to :json

  before_action :check_api_version!, :authenticate!, :slow_api!

  def execute
    respond_with_result
  rescue GraphQL::Guard::NotAuthorizedError => e
    render json: { errors: ['Unauthorized Access: ' + e.to_s] }, status: :unauthorized
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development e
  end

  private

  def respond_with_result
    @result = execute_query

    if Rails.env.development?
      @status = @result&.key?('errors') ? 500 : 200
      render json: @result, status: @status
    else
      render json: @result
    end
  end

  def execute_query
    if params.key?(:_json)
      MonioSchema.multiplex(batch_queries)
    else
      MonioSchema.execute(params[:query], args_for(params))
    end
  end

  def slow_api!
    sleep 10 if Flipper.enabled?(:slow_api)
  end

  def check_api_version!
    return if Rails.env.development?
    return if verify_api(request)

    render json: { errors: ['Client needs to be updated to newer version'] }, status: :bad_request
  end

  def args_for(params)
    {
      variables: ensure_hash(params[:variables]),
      query: params[:query],
      operation_name: params[:operationName],
      context: {
        ip: request.ip,
        current_user: current_user,
        refresh_token: refresh_token,
        request: request,
        response: response,
        sign_in: method(:sign_in),
        sign_out: method(:sign_out)
      }
    }
  end

  def batch_queries?
    params[:_json].present?
  end

  def batch_queries
    params[:_json].map do |param|
      args_for(param).merge(query: param[:query])
    end
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(error)
    logger.error error.message
    logger.error error.backtrace.join("\n")

    render json: { error: { message: error.message, backtrace: error.backtrace }, data: {} }, status: :internal_server_error
  end
end
