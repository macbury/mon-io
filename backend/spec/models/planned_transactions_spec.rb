require 'rails_helper'

RSpec.describe PlannedTransactions do
  subject { described_class.new(series: series, from_date: from_date, to_date: to_date, executed: false) }

  before do
    Timecop.freeze(Time.zone.parse('2019-01-02T10:00:00+01:00'))
    series.entries.create!(occured_at: Date.parse('2019-01-11'))
  end

  after do
    Timecop.return
  end

  describe 'generate Transaction for each friday in one month' do
    let!(:current_user) { create(:user) }
    let(:category) { create(:category, name: 'Repeat Transaction Category') }
    let!(:blueprint) { create(:transaction, author: current_user, notes: 'This should repeat', amount: '531.11', category: category) }
    let!(:series) { create(:series, user: current_user, blueprint: blueprint, recurrence: :every_week, start_at: Date.new(2018, 3, 2)) }

    let(:from_date) { Date.new(2019, 1, 1) }
    let(:to_date) { Date.new(2019, 1, 31) }
    let(:transaction) { subject.first }

    it { expect(subject.to_a.size).to eq(3) }

    it { expect(transaction).to be_kind_of(Transaction) }
    it { expect(transaction).not_to be_persisted }
    it { expect(transaction.date.to_date).to eq(Date.new(2019, 1, 4)) }
    it { expect(transaction.series_date.to_date).to eq(Date.new(2019, 1, 4)) }
    it { expect(transaction.notes).to eq('This should repeat') }
    it { expect(transaction.amount.to_s).to eq('-531.11') }
    it { expect(transaction.category.name).to eq('Repeat Transaction Category') }

    context 'there is already transaction for first friday' do
      before { series.entries.create!(occured_at: Date.new(2019, 1, 4)) }

      it { expect(subject.to_a.size).to eq(2) }
    end
  end
end
