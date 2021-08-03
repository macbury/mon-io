require 'rails_helper'

RSpec.describe 'createCategory', type: :graphql do
  subject { schema.execute(queries.create_category, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('createCategory.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { kind: 'Income' } } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:variables) { { input: input } }
    let(:data) { subject.dig('data', 'createCategory', 'category') }

    let(:input) do
      {
        shared: true,
        name: 'new name',
        kind: 'Saving',
        color: '#fff',
        icon: 'piggy-punk'
      }
    end

    it { is_expected.to be_successful_query }

    it { expect { subject }.to change(Category, :count).by(1) }
    it { expect { subject }.to change(current_user.categories, :count).by(1) }

    it 'returns created category' do
      expect(subject.dig('data', 'createCategory', 'errors')).to be_empty

      expect(data).to eq(
        'name' => 'new name',
        'kind' => 'Saving',
        'color' => '#fff',
        'icon' => 'piggy-punk',
        'id' => Category.last.id
      )
    end
  end
end