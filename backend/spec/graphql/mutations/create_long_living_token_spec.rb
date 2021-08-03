require 'rails_helper'

RSpec.describe 'createLongLivingToken', type: :graphql do
  subject { schema.execute(queries.create_long_living_token, { input: input }) }

  let(:context) { { current_user: current_user, ip: '127.1.1.1' } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('createLongLivingToken.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:input) { { name: 'Token name' } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }

    describe 'passing valid params' do
      let(:input) { { name: 'my new long living token' } }

      it { is_expected.to be_successful_query }
      it { expect { subject }.to change(RefreshToken, :count).by(1) }

      it 'returns created token' do
        expect(subject.dig('data', 'createLongLivingToken', 'errors')).to be_empty
        expect(subject.dig('data', 'createLongLivingToken', 'refreshToken')).to be_present
      end
    end

    describe 'passing invalid params' do
      let(:input) { { name: '' } }

      it { is_expected.to be_successful_query }
      it { expect { subject }.to change(RefreshToken, :count).by(0) }

      it 'returns created token' do
        expect(subject.dig('data', 'createLongLivingToken', 'errors')).to eq(["Name can't be blank"])
      end
    end
  end
end