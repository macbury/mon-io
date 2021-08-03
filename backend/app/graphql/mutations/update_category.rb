module Mutations
  class UpdateCategory < Types::BaseMutation
    null true

    argument :id, ID, required: true

    argument :shared, Boolean, required: true
    argument :archived, Boolean, required: true
    argument :name, String, required: false
    argument :icon, String, required: false
    argument :color, String, required: false
    argument :currency, String, required: false

    field :category, Types::CategoryType, null: true
    field :errors, [String], null: false

    def resolve(id:, shared: nil, **kwargs)
      category = Category.find(id)

      if category.system?
        category.update!(shared: shared)
      else
        category.update!(kwargs.merge(shared: shared))
      end

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