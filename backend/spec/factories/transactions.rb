FactoryBot.define do
  factory :transaction do
    date { Time.zone.now }
    association(:category)
    amount_cents { 100 }
    kind { :expense }

    trait :with_author do
      author { create(:user) }
    end

    trait :with_location do
      location { create(:location) }
    end

    trait :with_receipt do
      after(:create) do |transaction|
        create(:receipt, user: transaction.author, owner: transaction)
      end
    end

    trait :near_kfc do
      lat { 50.087032 }
      lng { 20.005092 }
    end
  end
end
