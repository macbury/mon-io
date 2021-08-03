require 'rails_helper'

RSpec.describe 'createReceipt', type: :graphql do
  subject { schema.execute(queries.create_receipt, variables) }

  let(:context) { { current_user: current_user } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('createReceipt.graphql') }

  before { allow(Download::Tesseract).to receive(:call) }

  context 'as guest' do
    let(:current_user) { nil }
    let(:variables) { { category_id: 'boom', file: 'boom2' } }

    it { expect { subject }.to raise_error(GraphQL::Guard::NotAuthorizedError) }
  end

  context 'as user' do
    let(:current_user) { create(:user) }
    let(:category) { create(:category) }

    describe 'for valid params' do
      let(:variables) { { category_id: category.id, file: File.new(file_fixture('receipt.png'), 'r') } }

      it { is_expected.to be_successful_query }
      it { expect { subject }.to change(Receipt, :count).by(1) }

      it 'try to autoassign category' do
        expect(Categories::Suggest).to receive(:call)
        subject
      end

      it 'returns created receipt' do
        expect(subject.dig('data', 'createReceipt', 'errors')).to be_empty
        expect(subject.dig('data', 'createReceipt', 'receipt', 'id')).to be_present
        expect(subject.dig('data', 'createReceipt', 'receipt', 'user', 'id')).to eq(current_user.id)
        expect(subject.dig('data', 'createReceipt', 'receipt', 'category', 'id')).to eq(category.id)
      end
    end

    describe 'for invalid params' do
      let(:variables) { { file: File.new(file_fixture('invalid.txt'), 'r'), location: { lat: 5, lng: 5 } } }

      it { is_expected.to be_successful_query }
      it { expect { subject }.to change(Receipt, :count).by(0) }

      it 'returns errors' do
        expect(subject.dig('data', 'createReceipt', 'errors')).not_to be_empty
      end
    end
  end
end