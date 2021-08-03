FactoryBot.define do
  factory :user do
    sequence(:username) { |index| "user#{index}" }
    sequence(:password) { |index| "password#{index}" }

    trait :with_refresh_token do
      after(:create) do |user|
        user.refresh_tokens.create!(name: 'client', ip: '127.0.0.1')
      end
    end
  end
end
