require 'rails_helper'

RSpec.describe 'refreshAccessToken', type: :graphql do
  subject { schema.execute(mutations.refresh_access_token, variables) }

  let(:context) { {} }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:mutations) { graphql_fixture('refreshAccessToken.graphql') }

  context 'invalid refresh_token' do
    let(:variables) { { refresh_token: 'Yolololo', name: 'Firefox' } }

    it { is_expected.to be_successful_query }

    it 'only returns a errors' do
      expect(subject['data']).to eq(
        'refreshAccessToken' => {
          'errors' => ['Invalid refresh token'],
          'accessToken' => nil
        }
      )
    end
  end

  context 'valid refresh token' do
    let!(:user) { create(:user, :with_refresh_token) }
    let(:refresh_token) { TokenScopes.refresh_token(user.refresh_tokens.first) }
    let(:variables) { { refresh_token: refresh_token, name: 'Chrome' } }

    it 'returns access token' do
      expect(subject).to be_successful_query

      expect(subject.dig('data', 'refreshAccessToken', 'errors')).to be_empty
      expect(subject.dig('data', 'refreshAccessToken', 'accessToken')).to be_present
    end
  end

  context 'valid access token' do
    let!(:user) { create(:user, :with_refresh_token) }
    let(:refresh_token) { TokenScopes.access_token(user.refresh_tokens.first) }
    let(:variables) { { refresh_token: refresh_token, name: 'Chrome' } }

    it { is_expected.to be_successful_query }

    it 'only returns a errors' do
      expect(subject['data']).to eq(
        'refreshAccessToken' => {
          'errors' => ['Invalid refresh token'],
          'accessToken' => nil
        }
      )
    end
  end
end