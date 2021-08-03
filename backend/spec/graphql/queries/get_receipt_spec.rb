require 'rails_helper'

RSpec.describe 'getReceipt', type: :graphql do
  subject { schema.execute(queries.get_receipt, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('getReceipt.graphql') }
  let(:variables) { { id: 'boom' } }

  context 'guest' do
    let(:current_user) { nil }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'logged in user' do
    let(:current_user) { receipt.user }
    let!(:receipt) { create(:receipt, :with_user) }
    let(:variables) { { id: receipt.id } }

    it { is_expected.to be_successful_query }

    it {
      expect(subject['data']).to eq({
                                      'getReceipt' => {
                                        'id' => receipt.id
                                      }
                                    })
    }
  end
end