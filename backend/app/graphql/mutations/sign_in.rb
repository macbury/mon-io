module Mutations
  class SignIn < Types::BaseMutation
    use Security::VerifyProofOfWork, as: :verify_proof_of_work!

    null true

    argument :username, String, required: true
    argument :password, String, required: true
    argument :name, String, required: true

    argument :proof_of_work, Types::ProofOfWorkInput, required: true

    field :refresh_token, Types::RefreshTokenType, null: true
    field :errors, [String], null: false

    def resolve(username:, password:, name:, proof_of_work:)
      cleanup_session

      verify_proof_of_work!(proof_of_work.to_h.merge({ input: [username, password] }))

      user = User.find_for_authentication(username: username)
      token = user&.valid_password?(password) ? user.refresh_tokens.create!(name: name, ip: context[:ip]) : nil

      context[:sign_in].call(:user, user) if token

      {
        refresh_token: token,
        errors: token ? [] : ['Invalid credentials']
      }
    end

    private

    def cleanup_session
      context[:sign_out].call(context[:current_user])
      context[:refresh_token]&.destroy
    end
  end
end