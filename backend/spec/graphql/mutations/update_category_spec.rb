require 'rails_helper'

RSpec.describe 'updateCategory', type: :graphql do
  subject { schema.execute(queries.update_category, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('updateCategory.graphql') }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { input: { id: '123', shared: true, archived: false } } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category, shared: false, name: 'old name') }
    let(:variables) { { input: input } }
    let(:data) { subject.dig('data', 'updateCategory', 'category') }

    let(:input) do
      {
        id: category.id,
        shared: true,
        name: 'new name',
        archived: false
      }
    end

    it { is_expected.to be_successful_query }

    it 'returns updated category' do
      expect(subject.dig('data', 'updatedCategory', 'errors')).to be_nil
      expect(data).to eq({ 'id' => category.id })
      expect(category.reload.name).to eq('old name')
      expect(category.reload.shared).to eq(true)
    end
  end
end