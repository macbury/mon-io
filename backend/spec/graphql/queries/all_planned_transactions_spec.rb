require 'rails_helper'

RSpec.describe 'allPlannedTransactions', type: :graphql do
  subject { schema.execute(queries.planned_transactions, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('plannedTransactions.graphql') }

  before do
    Timecop.freeze(Time.zone.parse('1990-03-12T00:00:00+01:00'))
  end

  after do
    Timecop.return
  end

  context 'guest' do
    let(:variables) { { month: 'today' } }
    let(:current_user) { nil }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'user signed in' do
    let(:variables) { { month: 'today' } }
    let(:current_user) { create(:user) }
    let!(:series) { create(:series, user: current_user) }

    it do
      expect(subject.dig('data', 'plannedTransactions')).to eq(
        [
          {
            'amount' => { 'cents' => -100 },
            'category' => { 'name' => series.blueprint.category.name },
            'date' => '1990-03-12T01:00:00+01:00',
            'location' => nil
          }
        ]
      )
    end
  end
end
