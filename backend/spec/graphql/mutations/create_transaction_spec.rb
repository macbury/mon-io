require 'rails_helper'

RSpec.describe 'createTransaction', type: :graphql do
  subject { schema.execute(queries.create_transaction, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('createTransaction.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) do
      {
        input: {
          kind: 'Expense',
          category_id: '2430c542-1f66-4dbd-8a6a-073982ec5sbe7',
          date: '2019-11-20T10:47:32Z',
          amount: 1522,
          currency: 'PLN',
          receipt_id: '52806e0c-3a95-4563-a810-994893dd3532',
          location: {
            lat: 50.087032,
            lng: 20.005092
          }
        }
      }
    end

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }
    let(:receipt) { create(:receipt, user: current_user) }

    describe 'for valid params', vcr: 'reverse/kfc' do
      let(:variables) do
        {
          input: {
            kind: 'Expense',
            category_id: category.id,
            receipt_id: receipt.id,
            date: '2019-11-20T10:47:32Z',
            location: {
              lat: 50.087032,
              lng: 20.005092
            },
            amount: 666,
            currency: 'USD'
          }
        }
      end

      it { is_expected.to be_successful_query }
      it { expect { subject }.to change(Transaction, :count).by(1) }

      it 'returns created transaction' do
        expect(subject.dig('data', 'createTransaction', 'errors')).to be_empty
        expect(subject.dig('data', 'createTransaction', 'transaction', 'id')).to be_present
        expect(subject.dig('data', 'createTransaction', 'transaction', 'author', 'id')).to eq(current_user.id)
        expect(subject.dig('data', 'createTransaction', 'transaction', 'category', 'id')).to eq(category.id)
        expect(subject.dig('data', 'createTransaction', 'transaction', 'receipt', 'id')).to eq(receipt.id)
      end
    end

    describe 'for invalid params' do
      let(:variables) do
        {
          input: {
            kind: 'Expense',
            category_id: '12345',
            receipt_id: 'asdasda',
            date: '2019-11-20T10:47:32Z',
            amount: 1234,
            currency: 'abc'
          }
        }
      end

      it { is_expected.to be_successful_query }
      it { expect { subject }.to change(Transaction, :count).by(0) }

      it 'returns errors' do
        expect(subject.dig('data', 'createTransaction', 'errors')).not_to be_empty
      end
    end
  end
end