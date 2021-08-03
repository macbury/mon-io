require 'rails_helper'

RSpec.describe ExchangeRate, type: :model do
  context 'validations' do
    it { is_expected.to validate_numericality_of(:value).is_greater_than(0) }
    it { is_expected.to validate_presence_of :value }
    it { is_expected.to validate_presence_of :date }
  end
end
