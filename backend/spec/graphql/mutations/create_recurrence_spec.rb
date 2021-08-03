require 'rails_helper'

RSpec.describe 'createRecurrence', type: :graphql do
  subject { schema.execute(mutations.create_recurrence, variables) }

  let(:schema) { use_schema(MonioSchema, context: context) }
  let(:mutations) { graphql_fixture('createRecurrence.graphql') }

  context 'as user' do
    let(:context) { { current_user: current_user } }
    let(:current_user) { create(:user) }

    describe 'valid input' do
      let(:transaction) { create(:transaction, author: current_user) }
      let(:variables) do
        {
          input: { transaction_id: transaction.id, recurrence: 'Everyday' }
        }
      end

      it 'return created series id' do
        expect(subject).to be_successful_query
        expect(subject.dig('data', 'createRecurrence', 'series', 'id')).to be_present
      end
    end

    describe 'not existing transaction id' do
      let(:variables) do
        {
          input: { transaction_id: '1111', recurrence: 'Everyday' }
        }
      end

      it 'return nothing' do
        expect(subject).to be_successful_query
        expect(subject.dig('data', 'createRecurrence')).to be_nil
      end
    end
  end

  context 'as guest' do
    let(:context) { {} }
    let(:variables) do
      {
        input: { transaction_id: 1111, recurrence: 'Everyday' }
      }
    end

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end
end