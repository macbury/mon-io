class MonioSchema < GraphQL::Schema
  query(Types::QueryType)
  cursor_encoder(NumberCursorEncoder)
  mutation(Types::MutationType)

  use GraphQL::Guard.new(policy_object: GraphPolicy)
  use GraphQL::Batch
  use BatchLoader::GraphQL
end

GraphQL::Errors.configure(MonioSchema) do
  rescue_from ServiceFailure do |exception|
    Rails.logger.error "Service Failure: #{exception}"
    { errors: [exception.to_s] }
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    Rails.logger.error "RecordNotFound: #{exception}"
    nil
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    Rails.logger.error "Validation error: #{exception}"
    { errors: exception.record.errors.full_messages }
  end
end
