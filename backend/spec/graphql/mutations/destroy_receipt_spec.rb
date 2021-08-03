require 'rails_helper'

RSpec.describe 'destroyReceipt', type: :graphql do
  subject { schema.execute(queries.destroy_receipt, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('destroyReceipt.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { id: 123 } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }
    let!(:receipt) { create(:receipt, user: current_user) }
    let!(:other_receipt) { create(:receipt, :with_user) }

    describe 'for valid params' do
      let(:variables) { { id: receipt.id } }

      it { is_expected.to be_successful_query }

      it 'destroys receipt' do
        expect { subject }.to change(Receipt, :count).by(-1)
      end
    end

    describe 'for other user receipt' do
      let(:variables) { { id: other_receipt.id } }

      it { is_expected.to be_successful_query }

      it 'dont destroys receipt' do
        expect { subject }.to change(Receipt, :count).by(0)
      end

      it 'returns nil for mutation' do
        expect(subject.dig('data', 'destroyReceipt')).to be_nil
      end
    end
  end
end