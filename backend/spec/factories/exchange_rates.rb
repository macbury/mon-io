FactoryBot.define do
  factory :exchange_rate do
    date { '2019-11-05' }
    currency { 'MyString' }
    value { '9.99' }
  end
end
