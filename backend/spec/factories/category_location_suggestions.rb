FactoryBot.define do
  factory :category_location_suggestion do
    rank { 0.5 }

    trait :with_location do
      association(:location)
    end

    trait :with_category do
      association(:category)
    end
  end
end
