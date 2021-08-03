require 'rails_helper'

RSpec.describe 'quickLoginToken', type: :graphql do
  subject { schema.execute(mutations.quick_login_token, variables) }

  let(:schema) { use_schema(MonioSchema, context: graph_context) }
  let(:mutations) { graphql_fixture('quickLoginToken.graphql') }
  let(:refresh_token) { create(:refresh_token) }
  let(:current_user) { refresh_token.user }

  context 'guest' do
    let(:graph_context) { {} }
    let(:variables) { { input: { refresh_token: TokenScopes.refresh_token(refresh_token) } } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'invalid refresh_token' do
    let(:graph_context) { { current_user: current_user } }
    let(:variables) { { input: { refresh_token: 'abc' } } }

    it { is_expected.to be_successful_query }

    it 'only returns a errors' do
      expect(subject['data']).to eq(
        'quickLoginToken' => {
          'token' => nil
        }
      )
    end
  end

  context 'valid refresh_token' do
    let(:graph_context) { { current_user: current_user } }
    let(:variables) { { input: { refresh_token: TokenScopes.refresh_token(refresh_token) } } }

    it { is_expected.to be_successful_query }

    it 'returns new token' do
      expect(subject.dig('data', 'quickLoginToken', 'token')).to be_present
    end
  end
end