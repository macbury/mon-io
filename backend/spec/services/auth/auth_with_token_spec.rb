require 'rails_helper'

RSpec.describe Auth::AuthWithToken do
  subject { described_class.new(access_token).call }

  let!(:user) { create(:user, :with_refresh_token) }
  let(:refresh_token) { user.refresh_tokens.first }

  describe 'valid access token' do
    let(:access_token) { TokenScopes.access_token(refresh_token) }

    it { is_expected.to eq(refresh_token) }
  end

  describe 'expired access token' do
    let!(:access_token) { TokenScopes.access_token(refresh_token) }

    it do
      Timecop.freeze(61.minutes.from_now) do
        expect(subject).to be_falsey
      end
    end
  end

  describe 'other access token' do
    let!(:access_token) { TokenScopes.refresh_token(refresh_token) }

    it { is_expected.to be_falsey }
  end

  describe 'invalid token' do
    let!(:access_token) { 'abcdefg' }

    it { is_expected.to be_falsey }
  end
end