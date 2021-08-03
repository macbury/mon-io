require 'rails_helper'

RSpec.describe Transactions::AccumulatedBalanceFor do
  subject(:result) { described_class.call(category: category, users: [user]) }

  before do
    Timecop.freeze(Time.zone.local(2020, 6, 1))
  end

  after do
    Timecop.return
  end

  describe 'with no existing transactions' do
    let(:category) { create(:category) }
    let(:user) { create(:user) }

    it { is_expected.to eq({ Time.zone.today.at_beginning_of_month => 0.to_money }) }
  end

  describe 'with existing transactions' do
    let(:category) { create(:category, kind: :saving) }
    let(:user) { create(:user) }

    let(:balances) do
      {
        Time.zone.local(2020, 1, 1).to_date => Money.new(2000),
        Time.zone.local(2020, 2, 1).to_date => Money.new(17_000),
        Time.zone.local(2020, 3, 1).to_date => Money.new(12_000),
        Time.zone.local(2020, 4, 1).to_date => Money.new(12_000),
        Time.zone.local(2020, 5, 1).to_date => Money.new(12_000),
        Time.zone.today.at_beginning_of_month => Money.new(12_000)
      }
    end

    before do
      create(:transaction, category: category, author: user, amount: Money.new(2000), date: Time.zone.local(2020, 1, 11), kind: :deposit)
      create(:transaction, category: category, author: user, amount: Money.new(15_000), date: Time.zone.local(2020, 2, 12), kind: :deposit)
      create(:transaction, category: category, author: user, amount: Money.new(-5000), date: Time.zone.local(2020, 3, 12), kind: :withdraw)
    end

    it { is_expected.to eq(balances) }
  end
end