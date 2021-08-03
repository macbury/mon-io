require 'rails_helper'

RSpec.describe 'quickSignIn', type: :graphql do
  subject { schema.execute(mutations.quick_sign_in, variables) }

  let(:schema) { use_schema(MonioSchema, context: { ip: '127.2.2.2' }) }
  let(:mutations) { graphql_fixture('quickSignIn.graphql') }
  let(:refresh_token) { create(:refresh_token) }

  context 'invalid refresh_token' do
    let(:variables) { { input: { token: 'abc', name: 'Rspec client' } } }

    it { is_expected.to be_successful_query }

    it 'only returns a errors' do
      expect(subject['data']).to eq(
        'quickSignIn' => {
          'refreshToken' => nil,
          'errors' => ['Invalid credentials']
        }
      )
    end
  end

  context 'valid refresh_token' do
    let(:variables) { { input: { token: TokenScopes.quick_login_token(refresh_token), name: 'Rspec client' } } }

    it { is_expected.to be_successful_query }

    it 'only returns a errors' do
      expect(subject.dig('data', 'quickSignIn', 'refreshToken', 'id')).to be_present
    end
  end
end