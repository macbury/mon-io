require 'rails_helper'

RSpec.describe 'transactions', type: :graphql do
  subject { schema.execute(queries.all_transactions, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('allTransactions.graphql') }

  context 'guest' do
    let(:variables) { { month: 'today' } }
    let(:current_user) { nil }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'logged in user' do
    before { create_list(:transaction, 10, :with_author) }

    let(:current_user) { create(:user) }
    let!(:current_transactions) { create_list(:transaction, 10, author: current_user) }
    let!(:old_transactions) { create_list(:transaction, 10, author: current_user, date: 2.months.ago) }
    let(:nodes) { subject.dig('data', 'transactions', 'nodes') }
    let(:nodes_ids) { nodes.map { |node| node['id'] } }

    describe 'for today' do
      let(:variables) { { month: 'today' } }

      it { is_expected.to be_successful_query }

      it 'have returned list of 10 transactions' do
        expect(nodes.size).to eq(10)
        expect(nodes_ids).to match_array(current_transactions.map(&:id))
        expect(nodes_ids).not_to match_array(old_transactions.map(&:id))
      end
    end

    describe 'for 2 months ago' do
      let(:variables) { { month: '2 months ago' } }

      it 'have returned list of 10 transactions' do
        expect(nodes.size).to eq(10)
        expect(nodes_ids).not_to match_array(current_transactions.map(&:id))
        expect(nodes_ids).to match_array(old_transactions.map(&:id))
      end
    end

    describe 'for 2 years ago' do
      let(:variables) { { month: '2 years ago' } }

      it 'have returned list of 0 transactions' do
        expect(nodes.size).to eq(0)
      end
    end
  end
end