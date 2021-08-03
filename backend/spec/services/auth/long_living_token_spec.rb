require 'rails_helper'

RSpec.describe Auth::LongLivingToken do
  subject(:service) { described_class.call(user: user, ip: '127.0.2.2', name: name) }

  let(:user) { create(:user) }
  let(:name) { 'my long living token' }

  it { expect { service }.to change(RefreshToken, :count).by(1) }
  it { is_expected.not_to be_blank }
end