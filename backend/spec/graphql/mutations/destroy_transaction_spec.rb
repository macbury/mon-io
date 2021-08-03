require 'rails_helper'

RSpec.describe 'destroyTransaction', type: :graphql do
  subject { schema.execute(queries.destroy_transaction, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('destroyTransaction.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { id: 123 } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }
    let!(:transaction) { create(:transaction, author: current_user) }
    let!(:other_transaction) { create(:transaction, :with_author) }

    describe 'for valid params' do
      let(:variables) { { id: transaction.id } }

      it { is_expected.to be_successful_query }

      it 'destroys transaction' do
        expect { subject }.to change(Transaction, :count).by(-1)
      end
    end

    describe 'for other user transaction' do
      let(:variables) { { id: other_transaction.id } }

      it { is_expected.to be_successful_query }

      it 'not destroying transaction' do
        expect { subject }.to change(Transaction, :count).by(0)
      end

      it 'returns nil for mutation' do
        expect(subject.dig('data', 'destroyTransaction')).to be_nil
      end
    end
  end
end