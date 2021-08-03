module Kindable
  extend ActiveSupport::Concern

  included do
    enum kind: {
      expense: 0,
      income: 1,
      tax: 2,
      saving: 3,
      loan: 4,
      withdraw: 5,
      deposit: 6
    }.freeze
  end

  def negative?
    expense? || tax? || withdraw? || loan?
  end

  def positive?
    income? || deposit? || saving?
  end

  def system?
    expense? || tax? || income?
  end

  def kind_by_amount
    if saving?
      { negative: 'withdraw', positive: 'deposit' }
    else
      { negative: kind.to_s, positive: kind.to_s }
    end
  end
end