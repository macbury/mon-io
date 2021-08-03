require 'rails_helper'

RSpec.describe 'updateTransaction', type: :graphql do
  subject { schema.execute(queries.update_transaction, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('updateTransaction.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { id: '123', attributes: { amount_cents: 1000, amount_currency: 'EUR', kind: 'Expense' } } } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }
    let!(:transaction) { create(:transaction, author: current_user) }
    let(:variables) { { input: input } }
    let(:data) { subject.dig('data', 'updateTransaction', 'transaction') }

    let(:input) do
      {
        id: transaction.id,
        attributes: {
          amount_cents: 738_874,
          amount_currency: 'USD',
          category_id: category.id,
          date: '2019-10-10',
          kind: 'Expense'
        }
      }
    end

    it { is_expected.to be_successful_query }

    it 'returns updated transaction' do
      expect(subject.dig('data', 'updateTransaction', 'errors')).to be_empty
      expect(data).to eq({
                           'id' => transaction.id,
                           'amount' => {
                             'cents' => -738_874
                           },
                           'category' => {
                             'id' => category.id
                           },
                           'date' => '2019-10-10T02:00:00+02:00'
                         })
    end
  end
end