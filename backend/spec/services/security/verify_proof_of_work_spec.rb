require 'rails_helper'

RSpec.describe Security::VerifyProofOfWork do
  subject(:result) { described_class.call(arguments) }

  let(:arguments) do
    {
      jwt_token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsibm9uY2UiXSwibm9uY2UiOiI0ZDMxYmYxZWUwZDBjZTUzMjYxMjkxOTg5MWQ4MzJjNDlkZWE4ZDA2ZTJkMWE4OTFkYzc4NjNkMGFkNDIyMTkzIiwiZGlmZmljdWx0eSI6IjAwMCIsImV4cCI6MTYwMTgwMzU0N30.JN9xqP_YnQwMjr1v9LwxqQmFqX9rJpPF--sIfKpJw4k',
      counter: 452,
      hash: '000fa82799f8b249b520306b856afdcf5e49d5964a88d00407cc7d698f85dddad7268fdcbfebdff668071c57e2d0eadd24eeb1c6c17abe95367651082a96c9ee',
      input: %w[admin test]
    }
  end

  before do
    allow(Rails.application.secrets).to receive(:secret_key_base).and_return('60cd3d6737029c94d5651ee4834110ea')
  end

  after { Timecop.return }

  describe 'when valid token' do
    before { Timecop.travel Time.zone.at(1_601_803_499) }

    it { is_expected.to eq(true) }
  end

  describe 'when expired token' do
    before { Timecop.travel(DateTime.new(2030, 8, 2, 13, 0, 0)) }

    it { expect { result }.to raise_error(ServiceFailure, 'Invalid nonce') }
  end
end