require 'rails_helper'

RSpec.describe CategoryLocationSuggestion, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:location) }
    it { is_expected.to belong_to(:category) }
  end
end
