require 'rails_helper'

RSpec.describe Category, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user).optional }
    it { is_expected.to have_many(:transactions) }
    it { is_expected.to have_many(:imports) }
    it { is_expected.to have_many(:receipts) }
    it { is_expected.to have_many(:category_location_suggestions) }
    it { is_expected.to have_many(:category_budgets) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end

  it 'is expense by default' do
    expect(described_class.new).to be_expense
  end

  it 'dont have currency attribute and returns default currency' do
    category = described_class.new
    expect(category.read_attribute(:currency)).to be_nil
    expect(category.currency).to eq(Money.default_currency)
  end

  it 'changes currency' do
    category = described_class.new(currency: 'BTC')
    expect(category.read_attribute(:currency)).to eq('BTC')
    expect(category.currency).to eq(Money::Currency.new('BTC'))
  end
end
