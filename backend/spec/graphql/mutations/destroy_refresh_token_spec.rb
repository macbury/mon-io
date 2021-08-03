require 'rails_helper'

RSpec.describe 'destroyRefreshToken', type: :graphql do
  subject { schema.execute(queries.destroy_refresh_token, { input: input }) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('destroyRefreshToken.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:input) { { id: 123 } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }
    let!(:refresh_token) { create(:refresh_token, user: current_user) }
    let!(:other_refresh_token) { create(:refresh_token) }

    describe 'for valid params' do
      let(:input) { { id: refresh_token.id } }

      it { is_expected.to be_successful_query }

      it 'destroys refresh_token' do
        expect { subject }.to change(RefreshToken, :count).by(-1)
      end
    end

    describe 'for other user refresh_token' do
      let(:input) { { id: other_refresh_token.id } }

      it { is_expected.to be_successful_query }

      it 'dont destroys refresh_token' do
        expect { subject }.to change(RefreshToken, :count).by(0)
      end

      it 'returns nil for mutation' do
        expect(subject.dig('data', 'destroyRefreshToken')).to be_nil
      end
    end
  end
end