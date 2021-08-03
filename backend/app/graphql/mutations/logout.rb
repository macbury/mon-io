module Mutations
  class Logout < GraphQL::Schema::Mutation
    null true

    field :success, Boolean, null: true
    field :errors, [String], null: false

    def resolve
      context[:sign_out].call(context[:current_user])
      context[:refresh_token]&.destroy

      {
        success: true,
        errors: []
      }
    end
  end
end