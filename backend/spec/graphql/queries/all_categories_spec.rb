require 'rails_helper'

RSpec.describe 'allCategories', type: :graphql do
  subject { schema.execute(queries.all_categories) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('allCategories.graphql') }

  context 'guest' do
    let(:current_user) { nil }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'logged in user' do
    let(:current_user) { create(:user) }
    let!(:category) { create(:category, name: 'yolo') }

    it { is_expected.to be_successful_query }

    it {
      expect(subject['data']).to eq({
                                      'allCategories' => {
                                        'nodes' => [
                                          { 'id' => category.id, 'name' => 'yolo' }
                                        ]
                                      }
                                    })
    }
  end
end