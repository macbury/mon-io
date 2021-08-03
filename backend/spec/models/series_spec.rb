require 'rails_helper'

RSpec.describe Series, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:blueprint) }
    it { is_expected.to validate_presence_of(:user) }
    it { is_expected.to validate_presence_of(:recurrence) }
  end

  describe 'columns' do
    it { is_expected.to have_db_column(:user_id).of_type(:uuid) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user).class_name('User') }
    it { is_expected.to belong_to(:parent).class_name('Series').optional }
    it { is_expected.to have_one(:blueprint) }
    it { is_expected.to have_many(:transactions) }
    it { is_expected.to have_many(:entries) }
  end

  describe '#schedule' do
    it 'deserializes schedule' do
      Timecop.freeze(Time.zone.local(1990)) do
        start_time = 10.days.ago
        series = described_class.new(start_at: start_time, recurrence: :everyday)
        expect(series.schedule.start_time.to_date).to eq(start_time.to_date)
      end
    end
  end
end
