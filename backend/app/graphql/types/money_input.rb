module Types
  class MoneyInput < BaseInputObject
    description 'Money input representation'
    argument :cents, Integer, 'Amount represented by whole cents', required: true
    argument :currency, String, 'Name of the currency, if you leave it blank then it fallback to default one', required: false
  end
end
