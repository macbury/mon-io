require 'rails_helper'

RSpec.describe RefreshToken, type: :model do
  describe '#associations' do
    it { is_expected.to belong_to(:user) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of :name }
  end

  describe '#generate_jwt_hmac_secret_base' do
    it 'has secret after save' do
      refresh_token = build(:refresh_token)
      expect(refresh_token.jwt_hmac_secret_base).to be_nil
      expect(refresh_token.save).to be(true)
      expect(refresh_token.jwt_hmac_secret_base).to be_present
    end
  end
end
