module Mutations
  class UpdateImport < Types::BaseMutation
    use ::Imports::Transactions, as: :import_transactions
    null true

    argument :id, ID, required: true
    argument :from_line, Integer, required: false
    argument :to_line, Integer, required: false
    argument :encoding, String, required: false
    argument :delimiter, String, required: false
    argument :category_id, ID, required: false

    argument :notes_column, Integer, required: false
    argument :amount_column, Integer, required: false
    argument :date_column, Integer, required: false

    argument :rows, [Types::ImportRowType], required: true

    field :import, Types::ImportType, null: true
    field :errors, [String], null: false

    def resolve(id:, rows:, **attributes)
      import = current_user.imports.find(id)

      Import.transaction do
        import.update!(attributes)

        import_transactions(import: import, rows: rows)

        import.update!(processed: true)
      end

      {
        import: import,
        errors: []
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        import: nil,
        errors: e.record.errors.full_messages
      }
    end
  end
end