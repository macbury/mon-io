FactoryBot.define do
  factory :category do
    sequence(:name) { |index| "Category #{index}" }
    color { '#ffffff' }
    icon { 'test' }
  end
end
