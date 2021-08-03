require 'rails_helper'

RSpec.describe ApiController, type: :controller do
  it 'does authorization' do
    refresh_token = create(:refresh_token)
    request.headers[:Authorization] = 'Token token=random-token'

    expect(Auth::AuthWithToken).to receive(:call).with('random-token').and_return(refresh_token)
    post :execute
    expect(assigns(:refresh_token)).to eq(refresh_token)
    expect(response).to have_http_status(:success)
  end
end