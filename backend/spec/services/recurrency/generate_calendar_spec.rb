require 'rails_helper'

RSpec.describe Recurrency::GenerateCalendar do
  subject { described_class.new(user: current_user, ignore_ids: []).call }

  before { Timecop.travel(DateTime.new(2020, 1, 2, 12, 0, 0)) }

  after { Timecop.return }

  let(:current_user) { create(:user) }
  let!(:series) { create(:series, user: current_user, recurrence: :everyday, start_at: 20.days.ago) }

  it { is_expected.not_to be_nil }
end