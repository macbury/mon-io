require 'rails_helper'

RSpec.describe Transaction, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:date) }
  end

  describe 'columns' do
    it { is_expected.to have_db_column(:author_id).of_type(:uuid) }
    it { is_expected.to have_db_column(:category_id).of_type(:uuid) }
    it { is_expected.to have_db_column(:blueprint_id).of_type(:uuid) }
    it { is_expected.to monetize(:amount) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:author).class_name('User') }
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:link).optional }
    it { is_expected.to belong_to(:import).optional }
    it { is_expected.to have_one(:series).optional }
    it { is_expected.to have_one(:series_entry).optional }
    it { is_expected.to belong_to(:series_blueprint).class_name('Series').optional }
    it { is_expected.to belong_to(:location).optional }
    it { is_expected.to have_one(:receipt) }
  end

  describe 'amount symbol from category' do
    let(:user) { create(:user) }

    it 'creates expense' do
      tax_category = create(:category, kind: :tax)
      expense_category = create(:category, kind: :expense)

      expect(
        create(:transaction, category: tax_category, amount: 1000, author: user, kind: :tax).amount_cents
      ).to eq(-100_000)

      expect(
        create(:transaction, category: expense_category, amount: 1000, author: user, kind: :expense).amount_cents
      ).to eq(-100_000)
    end

    it 'creates income' do
      income_cat = create(:category, kind: :income)

      expect(
        create(:transaction, category: income_cat, amount: -1000, author: user, kind: :income).amount_cents
      ).to eq(100_000)
    end

    it 'creates deposit' do
      category = create(:category, kind: :saving)

      expect(
        create(:transaction, category: category, amount: -1000, author: user, kind: :deposit).amount_cents
      ).to eq(100_000)
    end

    it 'creates withdraw' do
      category = create(:category, kind: :saving)

      expect(
        create(:transaction, category: category, amount: 1000, author: user, kind: :withdraw).amount_cents
      ).to eq(-100_000)
    end
  end

  context 'implements Geocodable' do
    subject { build(:transaction, :with_author, :near_kfc) }

    it 'generates location and assigns it to created reciept', vcr: 'reverse/kfc' do
      expect { subject.save! }.to change(Location, :count).by(1)
      expect(subject.location).to be_persisted
      expect(subject.location.name).to eq('KFC')
    end
  end
end
