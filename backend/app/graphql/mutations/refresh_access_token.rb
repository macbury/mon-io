module Mutations
  class RefreshAccessToken < Types::BaseMutation
    use Auth::RefreshAccessToken, as: :refresh_access_token
    null true

    argument :refresh_token, String, required: true

    field :access_token, String, null: true
    field :errors, [String], null: false

    def resolve(refresh_token:)
      access_token = refresh_access_token(refresh_token)
      {
        access_token: access_token,
        errors: access_token ? [] : ['Invalid refresh token']
      }
    end
  end
end