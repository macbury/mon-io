module Mutations
  class CreateImport < Types::BaseMutation
    null true

    argument :file, ApolloUploadServer::Upload, required: true

    field :import, Types::ImportType, null: true
    field :errors, [String], null: false

    def resolve(...)
      import = current_user.imports.create!(...)

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