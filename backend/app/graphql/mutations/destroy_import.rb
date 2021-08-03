module Mutations
  class DestroyImport < Types::BaseMutation
    null true

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      import = current_user.imports.find(id)

      {
        success: import.destroy
      }
    end
  end
end