require 'rails_helper'

RSpec.describe 'signIn', type: :graphql do
  subject { schema.execute(mutations.sign_in, variables) }

  let(:sign_in) { instance_double('SigninMethod', call: nil) }
  let(:sign_out) { instance_double('SignoutMethod', call: nil) }

  let(:context) { { sign_in: sign_in, sign_out: sign_out, ip: '127.0.0.1' } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:mutations) { graphql_fixture('signIn.graphql') }

  context 'invalid credentials' do
    let(:variables) do
      {
        input: {
          username: 'yolo',
          password: 'other',
          name: 'Rspec',
          proofOfWork: {
            counter: 1244,
            hash: '123134',
            jwtToken: 'abcd'
          }
        }
      }
    end

    before do
      allow(Security::VerifyProofOfWork).to receive(:call)
    end

    it { is_expected.to be_successful_query }

    it 'only returns a errors' do
      expect(subject['data']).to eq(
        'signIn' => {
          'errors' => ['Invalid credentials'],
          'refreshToken' => nil
        }
      )
    end
  end

  context 'valid credentials' do
    let!(:user) { create(:user) }
    let(:variables) do
      {
        input: {
          username: user.username,
          password: user.password,
          name: 'Rspec',
          proofOfWork: {
            counter: 1244,
            hash: '123134',
            jwtToken: 'abcd'
          }
        }
      }
    end

    before do
      allow(Security::VerifyProofOfWork).to receive(:call)
    end

    it 'returns refresh token' do
      expect(user.refresh_tokens).to be_empty

      expect(sign_in).to receive(:call).with(:user, user)
      expect(subject).to be_successful_query

      expect(subject['data']).to eq(
        'signIn' => {
          'errors' => [],
          'refreshToken' => {
            'id' => user.refresh_tokens.last.id
          }
        }
      )

      expect(user.refresh_tokens).not_to be_empty
    end
  end
end