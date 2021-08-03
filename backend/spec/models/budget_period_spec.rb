require 'rails_helper'

RSpec.describe BudgetPeriod, type: :model do
  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:date).scoped_to(:user_id) }
  end

  describe 'columns' do
    it { is_expected.to have_db_column(:user_id).of_type(:uuid) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:category_budgets) }
  end

  describe '#at' do
    let(:user_a) { create(:user) }
    let(:user_b) { create(:user) }

    it 'creates only one period for month' do
      expect { user_a.budget_periods.at(Time.zone.now) }.to change(described_class, :count).by(1)
      expect { user_a.budget_periods.at(Time.zone.now) }.to change(described_class, :count).by(0)

      expect { user_b.budget_periods.at(Time.zone.now) }.to change(described_class, :count).by(1)
      expect { user_b.budget_periods.at(Time.zone.now) }.to change(described_class, :count).by(0)

      expect { user_b.budget_periods.at(1.month.from_now) }.to change(described_class, :count).by(1)
    end

    it 'have date and user for current month' do
      period = user_a.budget_periods.at(Time.zone.now)
      expect(period).to be_persisted
      expect(period.date).to eq(Time.zone.now.at_beginning_of_month.to_date)
      expect(period.user).to eq(user_a)
    end
  end
end
