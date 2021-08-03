FactoryBot.define do
  factory :location do
    sequence(:id) { |id| "plusCode#{id}" }
    sequence(:name) { |index| "name#{index}" }
    full_address { Faker::Address.full_address }
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
    country { 'pl' }
    suburb { 'Test' }
    city { Faker::Address.city }
    postcode { Faker::Address.postcode }
  end
end
