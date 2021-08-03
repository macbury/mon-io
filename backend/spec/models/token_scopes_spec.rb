require 'rails_helper'

RSpec.describe TokenScopes, type: :model do
  subject { JWT.decode token, nil, false }

  let(:refresh_token) { create(:refresh_token) }

  before { Timecop.travel(DateTime.new(2020, 2, 23, 13, 0, 0)) }

  after { Timecop.return }

  describe '#favicon_token' do
    let(:token) { described_class.favicon_token(link_id: 'link-uuid') }

    it {
      expect(subject).to eq([
                              {
                                'aud' => ['favicon'],
                                'exp' => 1_582_585_199,
                                'link_id' => 'link-uuid'
                              },
                              {
                                'alg' => 'HS256'
                              }
                            ])
    }
  end

  describe '#refresh_token' do
    let(:token) { described_class.refresh_token(refresh_token) }

    it {
      expect(subject).to eq([
                              {
                                'aud' => ['generate_access_token'],
                                'refresh_token_id' => refresh_token.id
                              },
                              {
                                'alg' => 'HS256'
                              }
                            ])
    }
  end

  describe '#access_token' do
    let(:token) { described_class.access_token(refresh_token) }

    it {
      expect(subject).to eq([
                              {
                                'aud' => ['own_resources'],
                                'refresh_token_id' => refresh_token.id,
                                'exp' => 1_582_463_400
                              },
                              {
                                'alg' => 'HS256'
                              }
                            ])
    }
  end

  describe '#quick_login_token' do
    let(:token) { described_class.quick_login_token(refresh_token) }

    it 'returns quick login token with iss pointing to endpoint' do
      url_helpers = instance_double('UrlHelpers', endpoint_url: 'http://endpoint.test/api')
      expect(Rails.application.routes).to receive(:url_helpers).and_return(url_helpers)

      expect(subject).to eq([
                              {
                                'aud' => ['quick_login'],
                                'refresh_token_id' => refresh_token.id,
                                'exp' => 1_582_462_830,
                                'iss' => 'http://endpoint.test/api'
                              },
                              {
                                'alg' => 'HS256'
                              }
                            ])
    end
  end
end
