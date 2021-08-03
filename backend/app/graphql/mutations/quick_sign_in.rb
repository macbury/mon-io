module Mutations
  class QuickSignIn < Types::BaseMutation
    use Auth::QuickAuthWithToken, as: :get_refresh_token
    null true

    argument :token, String, required: true
    argument :name, String, required: true

    field :refresh_token, Types::RefreshTokenType, null: true
    field :errors, [String], null: false

    def resolve(token:, name:)
      new_refresh_token = get_refresh_token(token, name, context[:ip])

      {
        refresh_token: new_refresh_token,
        errors: new_refresh_token ? [] : ['Invalid credentials']
      }
    end
  end
end