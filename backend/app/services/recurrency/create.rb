module Recurrency
  class Create < TransactionService
    def initialize(transaction:, user:, recurrence:)
      @blueprint = transaction
      @user = user
      @recurrence = recurrence.to_sym
    end

    def call
      return nil if recurrence == :none

      series.save!

      copy_blueprint unless blueprint.date.future?
      series.reload
    end

    private

    attr_reader :blueprint, :user, :recurrence

    def series
      @series ||= user.series.create!(
        blueprint: blueprint,
        recurrence: recurrence,
        start_at: blueprint.date
      )
    end

    def copy_blueprint
      attributes = series.blueprint.attributes.except(
        'id',
        'created_at',
        'updated_at',
        'blueprint_id'
      )
      transaction = user.transactions.create!(attributes)
      series.entries.create!(occured_at: blueprint.date, operation: transaction)
      series.blueprint&.receipt&.update(owner: transaction)
      transaction
    end
  end
end
