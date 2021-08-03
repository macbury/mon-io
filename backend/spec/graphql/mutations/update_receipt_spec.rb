require 'rails_helper'

RSpec.describe 'updateReceipt', type: :graphql do
  subject { schema.execute(queries.update_receipt, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('updateReceipt.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { category_id: 'boom', id: 123 } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }
    let(:receipt) { create(:receipt, user: current_user) }
    let(:other_receipt) { create(:receipt, :with_user) }

    describe 'for valid params' do
      let(:variables) { { category_id: category.id, id: receipt.id } }

      it { is_expected.to be_successful_query }

      it 'returns updated receipt' do
        expect(subject.dig('data', 'updateReceipt', 'errors')).to be_empty
        expect(subject.dig('data', 'updateReceipt', 'receipt', 'category', 'id')).to eq(category.id)
      end
    end

    describe 'for other user receipt' do
      let(:variables) { { category_id: category.id, id: other_receipt.id } }

      it { is_expected.to be_successful_query }

      it 'returns nil for mutation' do
        expect(subject.dig('data', 'updateReceipt')).to be_nil
      end
    end
  end
end