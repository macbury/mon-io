require 'rails_helper'

RSpec.describe CategoryBudget, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:budget_period) }
    it { is_expected.to belong_to(:category) }
  end

  describe 'methods' do
    subject { create(:category_budget, category: category, planned: 60, budget_period: budget_period) }

    before do
      create_list(:transaction, 10, amount: 2, date: date, author: user, category: other_category)
      create(:transaction, amount: 3, date: date, author: other_user, category: category)
    end

    let!(:user) { create(:user) }
    let!(:other_user) { create(:user) }
    let(:category) { create(:category) }
    let(:other_category) { create(:category) }
    let(:date) { Date.parse('2020-03-02') }
    let!(:budget_period) { create(:budget_period, user: user, date: date) }
    let!(:transactions) { create_list(:transaction, 10, amount: 5, date: date, author: user, category: category) }

    it 'returns sum of transactions' do
      expect(subject.spend.to_s).to eq('50.00')
    end

    it 'returns only user transactions for category' do
      expect(subject.transactions).to match_array(transactions)
    end

    it 'returns executed' do
      expect((subject.executed * 100).round).to eq(83)
    end
  end
end
