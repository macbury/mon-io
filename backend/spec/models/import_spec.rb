require 'rails_helper'

RSpec.describe Import, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:category).optional }
    it { is_expected.to have_many(:transactions) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :file }
  end
end
