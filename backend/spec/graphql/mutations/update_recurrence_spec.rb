require 'rails_helper'

RSpec.describe 'updateRecurrence', type: :graphql do
  subject { schema.execute(mutations.update_recurrence, variables) }

  let(:schema) { use_schema(MonioSchema, context: context) }
  let(:mutations) { graphql_fixture('updateRecurrence.graphql') }
  let(:category) { create(:category) }

  context 'as guest' do
    let(:context) { {} }

    let(:variables) do
      {
        input: {
          seriesId: 1111,
          recurrence: 'Everyday',
          update_type: 'OnlyThis',
          end_at: nil,
          transaction: {
            amount_cents: 738_874,
            amount_currency: 'USD',
            category_id: category.id,
            date: '2019-10-10',
            kind: 'Expense'
          }
        }
      }
    end

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:context) { { current_user: series.user } }
    let(:series) { create(:series) }

    describe 'with valid input' do
      let(:variables) do
        {
          input: {
            series_id: series.id,
            recurrence: 'Everyday',
            update_type: update_type,
            end_at: nil,
            transaction: {
              amount_cents: 738_874,
              amount_currency: 'USD',
              category_id: category.id,
              date: '2019-10-10',
              kind: 'Expense'
            }
          }
        }
      end

      let(:transaction_args) do
        {
          amount_cents: 738_874,
          amount_currency: 'USD',
          category_id: category.id,
          date: DateTime.parse('2019-10-10'),
          kind: 'expense'
        }
      end

      describe 'update only this' do
        let(:update_type) { 'OnlyThis' }

        it 'return updated series' do
          expect(Recurrency::UpdateOnlyThis).to receive(:call).with(
            series: series,
            recurrence: 'everyday',
            transaction_args: transaction_args,
            end_at: nil
          )
          expect(subject).to be_successful_query
        end
      end

      describe 'update this and future' do
        let(:update_type) { 'ThisAndFuture' }

        it 'return updated series' do
          expect(subject).to be_successful_query
        end
      end
    end
  end
end