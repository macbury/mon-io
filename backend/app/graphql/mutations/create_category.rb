module Mutations
  class CreateCategory < Types::BaseMutation
    null true

    argument :kind, Types::TransactionKindEnum, required: true
    argument :shared, Boolean, required: false
    argument :name, String, required: false
    argument :icon, String, required: false
    argument :color, String, required: false
    argument :currency, String, required: false

    field :category, Types::CategoryType, null: true
    field :errors, [String], null: false

    def resolve(...)
      category = current_user.categories.build(...)

      if category.system?
        category.errors.add(:base, 'Cannot create another system category')
        raise ActiveRecord::RecordInvalid, category
      end

      category.save!

      {
        category: category,
        errors: []
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        category: nil,
        errors: e.record.errors.full_messages
      }
    end
  end
end
