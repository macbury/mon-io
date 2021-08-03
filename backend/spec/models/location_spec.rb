require 'rails_helper'

RSpec.describe Location, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:category_location_suggestions) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of :name }
    it { is_expected.to validate_presence_of :full_address }
    it { is_expected.to validate_presence_of :city }
    it { is_expected.to validate_presence_of :country }
    it { is_expected.to validate_presence_of :lat }
    it { is_expected.to validate_presence_of :lng }
  end
end
