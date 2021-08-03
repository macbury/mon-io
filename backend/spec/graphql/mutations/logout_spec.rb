require 'rails_helper'

RSpec.describe 'logout', type: :graphql do
  subject { schema.execute(queries.logout) }

  let(:sign_out) { instance_double('SignoutMethod', call: nil) }
  let(:current_user) { create(:user) }
  let(:context) { { current_user: current_user, sign_out: sign_out } }
  let(:schema)  { use_schema(MonioSchema, context: context) }
  let(:queries) { graphql_fixture('logout.graphql') }

  it { is_expected.to be_successful_query }
end