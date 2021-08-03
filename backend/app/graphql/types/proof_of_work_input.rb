module Types
  class ProofOfWorkInput < BaseInputObject
    argument :jwt_token, String, required: true
    argument :counter, Integer, required: true
    argument :hash, String, required: true, description: 'Proof of work generated from nonce and username with password'
  end
end