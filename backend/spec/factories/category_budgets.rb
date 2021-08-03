FactoryBot.define do
  factory :category_budget do
    planned { '' }
    kind { :expense }
    category_id { 'MyString' }
    budget_period_id { 'MyString' }
  end
end
