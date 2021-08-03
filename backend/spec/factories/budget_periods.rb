FactoryBot.define do
  factory :budget_period do
    date { '2020-01-12' }

    trait :with_author do
      author { create(:user) }
    end
  end
end
