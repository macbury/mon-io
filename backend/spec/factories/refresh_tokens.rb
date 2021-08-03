FactoryBot.define do
  factory :refresh_token do
    association(:user)
    sequence(:name) { |index| "client#{index}" }
    ip { '127.0.0.1' }
  end
end
