require 'rails_helper'

RSpec.describe Budgets::Projected do
  subject { described_class.call(user: current_user) }

  let(:current_user) { create(:user) }
  let(:category) { create(:category, name: 'Food') }
  let!(:other_category) { create(:category, name: 'Car') }

  before do
    Timecop.freeze(Time.zone.local(1990))
    10.times do |index|
      create_list(:transaction, 5, category: category, author: current_user, amount: 1000 * (index + 1), date: index.days.ago)
    end

    create_list(:transaction, 3, category: other_category, author: current_user, amount: 50, date: 4.days.ago)
    create_list(:transaction, 5, :with_author, category: other_category, amount: 1000, date: 5.days.ago)
  end

  after { Timecop.return }

  it 'calculates average spending' do
    expect(subject).to eq({
                            category => Money.new(-9_000_000),
                            other_category => Money.new(-5000)
                          })
  end
end