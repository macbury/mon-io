require 'rails_helper'

RSpec.describe Categories::Suggest do
  subject { described_class.call(receipt) }

  describe 'we have data' do
    let(:location) { create(:location) }
    let(:receipt) { create(:receipt, :with_user, location: location) }
    let!(:category_location_suggestion) { create(:category_location_suggestion, :with_category, rank: 0.2, location: location) }

    it 'suggest category from location' do
      subject
      expect(receipt.category).to eq(category_location_suggestion.category)
    end
  end

  describe 'we dont have data' do
    let(:receipt) { create(:receipt, :with_user) }

    it 'dont raise exception' do
      subject
      expect(receipt.category).to be_nil
    end
  end
end