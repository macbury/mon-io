require_relative './shared'

RSpec.describe Recurrency::UpdateThisAndFuture do
  subject { described_class.call(attributes) }

  before { Timecop.travel(DateTime.new(2020, 1, 2, 12, 0, 0)) }

  after { Timecop.return }

  let!(:series) { create(:series, recurrence: recurrence, end_at: 3.months.from_now) }

  describe 'series has nothing to update' do
    let(:recurrence) { :everyday }
    let(:end_at) { 10.days.from_now }
    let(:continued_series) { Series.where(parent_id: series.id) }

    let(:attributes) do
      {
        series: series,
        recurrence: recurrence,
        transaction_args: {
          date: end_at
        }
      }
    end

    it { is_expected.to be(series) }

    it 'dont create new series' do
      expect { subject }.to change(Series, :count).by(0)
    end
  end

  describe 'series with update for start date' do
    let(:recurrence) { :everyday }
    let(:end_at) { 10.days.from_now }
    let(:continued_series) { Series.where(parent_id: series.id) }

    let(:attributes) do
      {
        series: series,
        recurrence: :every_two_days,
        transaction_args: {
          date: series.start_at,
          notes: 'Hello world'
        }
      }
    end

    it { is_expected.to be(series) }
    it { is_expected.to be_every_two_days }

    it 'dont create new series' do
      expect { subject }.to change(Series, :count).by(0)
    end

    it 'updates the transaction' do
      expect(subject.blueprint.notes).to eq('Hello world')
    end
  end

  describe 'series with new transaction attributes' do
    let(:recurrence) { :weekdays }
    let(:end_at) { 10.days.from_now }
    let(:next_date) { 3.days.from_now }
    let(:entry_occured) { 5.days.from_now.to_date }
    let(:continued_series) { Series.where(parent_id: series.id) }

    let(:attributes) do
      {
        series: series,
        recurrence: :every_six_months,
        transaction_args: {
          date: next_date,
          notes: 'Hello world'
        }
      }
    end

    before do
      series.entries.create!(occured_at: entry_occured)
    end

    it { is_expected.not_to be(series) }
    it { is_expected.to be_every_six_months }

    it 'create new series' do
      expect { subject }.to change(Series, :count).by(1)
    end

    it 'create new transaction' do
      expect { subject }.to change(Transaction, :count).by(1)
    end

    it 'copy entries' do
      expect { subject }.to change(SeriesEntry, :count).by(1)
      expect(subject.entries.pluck(:occured_at)).to eq([entry_occured])
    end

    it 'change original series end date' do
      expect { subject }.to change { series.reload.end_at }.to((next_date - 1.day).to_date)
    end

    it 'starts from blueprint date' do
      expect(subject.blueprint).not_to eq(series.blueprint)
      expect(subject.start_at).to eq(next_date.to_date)
      expect(subject.blueprint.date).to eq(next_date)
    end
  end
end