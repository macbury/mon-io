require_relative './shared'

RSpec.describe Recurrency::Create do
  subject { described_class.new(transaction: transaction, user: current_user, recurrence: recurrence).call }

  before { Timecop.travel(DateTime.new(2020, 1, 2, 12, 0, 0)) }

  after { Timecop.return }

  let(:date) { Time.zone.now }
  let(:schedule) { subject.schedule }
  let(:occurences) { schedule.first(4).map { |d| d.to_date.to_s } }

  let(:current_user) { create(:user) }
  let!(:transaction) { create(:transaction, author: current_user, date: date) }

  describe 'receipt is removed from blueprint' do
    let(:recurrence) { :everyday }
    let!(:transaction) { create(:transaction, :with_receipt, author: current_user, date: date) }

    it { expect(transaction.receipt).not_to be_nil }
    it { expect(subject.blueprint.receipt).to be_nil }
  end

  describe 'recurrence is none' do
    let(:recurrence) { :none }

    it { expect(subject).to eq(nil) }
    it { expect { subject }.to change(Series, :count).by(0) }
    it { expect { subject }.to change(Transaction, :count).by(0) }
  end

  describe 'once recurrence' do
    let(:recurrence) { :once }
    let(:date) { Date.new(2020, 5, 5) }

    it_behaves_like 'planned transaction', ['2020-05-05']
  end

  describe 'everyday recurrence' do
    let(:recurrence) { :everyday }

    it_behaves_like 'series', %w[2020-01-02 2020-01-03 2020-01-04 2020-01-05]
    it_behaves_like 'series with transactions'
  end

  describe 'every_two_days recurrence' do
    let(:recurrence) { :every_two_days }

    it_behaves_like 'series', %w[2020-01-02 2020-01-04 2020-01-06 2020-01-08]
    it_behaves_like 'series with transactions'
  end

  describe 'weekdays recurrence' do
    let(:recurrence) { :weekdays }

    it_behaves_like 'series', %w[2020-01-02 2020-01-03 2020-01-06 2020-01-07]
    it_behaves_like 'series with transactions'
  end

  describe 'weekends recurrence' do
    let(:recurrence) { :weekends }

    it_behaves_like 'series', %w[2020-01-04 2020-01-05 2020-01-11 2020-01-12]
    it_behaves_like 'series with transactions'
  end

  describe 'every week recurrence' do
    let(:recurrence) { :every_week }

    it_behaves_like 'series', %w[2020-01-02 2020-01-09 2020-01-16 2020-01-23]
    it_behaves_like 'series with transactions'
  end

  describe 'every four weeks recurrence' do
    let(:recurrence) { :every_four_weeks }

    it_behaves_like 'series', %w[2020-01-02 2020-01-30 2020-02-27 2020-03-26]
    it_behaves_like 'series with transactions'
  end

  describe 'every month recurrence' do
    let(:recurrence) { :every_month }

    it_behaves_like 'series', %w[2020-01-02 2020-02-02 2020-03-02 2020-04-02]
    it_behaves_like 'series with transactions'
  end

  describe 'every two months recurrence' do
    let(:recurrence) { :every_two_months }

    it_behaves_like 'series', %w[2020-01-02 2020-03-02 2020-05-02 2020-07-02]
    it_behaves_like 'series with transactions'
  end

  describe 'every three months recurrence' do
    let(:recurrence) { :every_three_months }

    it_behaves_like 'series', %w[2020-01-02 2020-04-02 2020-07-02 2020-10-02]
    it_behaves_like 'series with transactions'
  end

  describe 'every six months recurrence' do
    let(:recurrence) { :every_six_months }

    it_behaves_like 'series', %w[2020-01-02 2020-07-02 2021-01-02 2021-07-02]
    it_behaves_like 'series with transactions'
  end

  describe 'every year recurrence' do
    let(:recurrence) { :every_year }

    it_behaves_like 'series', %w[2020-01-02 2021-01-02 2022-01-02 2023-01-02]
    it_behaves_like 'series with transactions'
  end
end
