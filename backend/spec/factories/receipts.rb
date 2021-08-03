FactoryBot.define do
  factory :receipt do
    file do
      receipt = Tempfile.new(['receipt', '.png'])
      receipt.write SecureRandom.hex(20)
      receipt.flush
      receipt
    end

    trait :with_user do
      association(:user)
    end

    trait :near_kfc do
      lat { 50.087032 }
      lng { 20.005092 }
    end
  end
end
