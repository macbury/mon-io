FactoryBot.define do
  factory :series do
    association(:user)

    recurrence { :everyday }
    start_at { Time.zone.now }

    before(:create) do |series, _evaluator|
      series.blueprint ||= create(:transaction, author: series.user)
    end
  end
end
