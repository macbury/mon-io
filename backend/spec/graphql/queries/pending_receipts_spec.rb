require 'rails_helper'

RSpec.describe 'pendingReceipts', type: :graphql do
  subject { schema.execute(queries.pending_receipts) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('pendingReceipts.graphql') }

  context 'guest' do
    let(:current_user) { nil }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'logged in user' do
    let(:current_user) { receipt.user }
    let!(:receipt) { create(:receipt, :with_user) }
    let!(:other_user_receipt) { create(:receipt, :with_user) }

    it { is_expected.to be_successful_query }

    it {
      expect(subject['data']).to eq({
                                      'pendingReceipts' => {
                                        'nodes' => [
                                          { 'id' => receipt.id }
                                        ]
                                      }
                                    })
    }
  end
end