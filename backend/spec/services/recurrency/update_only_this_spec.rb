require_relative './shared'

RSpec.describe Recurrency::UpdateOnlyThis do
  subject { described_class.call(attributes) }

  before { Timecop.travel(DateTime.new(2020, 1, 2, 12, 0, 0)) }

  after { Timecop.return }

  let!(:series) { create(:series, recurrence: recurrence) }
  let(:schedule) { subject.schedule }

  describe 'series is other than repeating once and nothing is to update' do
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

  describe 'series is other than repeating once' do
    let(:recurrence) { :everyday }
    let(:end_at) { 10.days.from_now }
    let(:continued_series) { Series.where(parent_id: series.id) }

    let(:attributes) do
      {
        series: series,
        recurrence: recurrence,
        end_at: 12.days.from_now,
        transaction_args: {
          date: end_at,
          notes: 'Hello world!'
        }
      }
    end

    it { is_expected.to be_once }
    it { is_expected.not_to be(series) }

    it 'create new series' do
      expect { subject }.to change(Series, :count).by(1)
    end

    it 'create new transaction blueprint' do
      expect { subject }.to change(Transaction, :count).by(1)
      expect(subject.blueprint).to be_present
      expect(subject.blueprint).not_to eq(series.blueprint)
      expect(subject.blueprint.notes).not_to eq(series.blueprint.notes)
      expect(subject.blueprint.notes).to eq('Hello world!')
    end

    it 'create new ignore date entry' do
      expect { subject }.to change(SeriesEntry, :count).by(1)
      expect(series.entries.first.occured_at).to eq(end_at.to_date)
    end
  end

  describe 'series is already repeating once' do
    let(:recurrence) { :once }
    let(:end_at) { 2.days.from_now }
    let(:series_end_at) { 10.days.from_now }

    let(:attributes) do
      {
        series: series,
        recurrence: recurrence,
        end_at: 10.days.from_now,
        transaction_args: {
          date: end_at,
          notes: 'Hello world!'
        }
      }
    end

    it 'returns current series' do
      expect(subject).to eq(series)
    end

    it 'dont create new transaction' do
      expect { subject }.to change(Transaction, :count).by(0)
    end

    it 'dont create new series' do
      expect { subject }.to change(Series, :count).by(0)
    end

    it 'updated blueprint attributes' do
      expect { subject }.to change { series.blueprint.reload.notes }.to('Hello world!')
    end

    it 'set date end from blueprint' do
      expect(subject.end_at).to eq(series_end_at.to_date)
    end
  end
end