module Mutations
  class DestroyRefreshToken < Types::BaseMutation
    null true

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      refresh_token = current_user.refresh_tokens.find(id)

      {
        success: refresh_token.destroy
      }
    end
  end
end