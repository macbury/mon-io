require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_presence_of(:password) }
  end

  describe 'associations' do
    it { is_expected.to have_many(:receipts) }
    it { is_expected.to have_many(:imports) }
    it { is_expected.to have_many(:categories) }
    it { is_expected.to have_many(:refresh_tokens) }
    it { is_expected.to have_many(:budget_periods) }
    it { is_expected.to have_many(:transactions).class_name('Transaction') }
  end

  it 'cleanups old tokens after save' do
    user = create(:user)

    Timecop.travel(1.month.ago) do
      2.times { user.refresh_tokens.create!(name: 'client', ip: '127.0.0.1') }
    end

    refresh_token = user.refresh_tokens.create!(name: 'client', ip: '127.0.0.1')
    expect(user.reload.refresh_tokens.count).to eq(3)
    user.save!
    expect(user.reload.refresh_tokens).to eq([refresh_token])
  end
end
