module Mutations
  class CreateLongLivingToken < Types::BaseMutation
    use Auth::LongLivingToken, as: :create_access_token
    null true

    argument :name, String, required: true

    field :refresh_token, Types::SessionType, null: true
    field :errors, [String], null: false

    def resolve(name:)
      refresh_token = create_access_token(
        user: current_user,
        name: name,
        ip: context[:ip]
      )

      {
        refresh_token: refresh_token,
        errors: []
      }
    end
  end
end