module Types
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    extend Usable
    # Add your custom classes if you have them:
    # This is used for generating payload types
    object_class Types::BaseObject
    # This is used for return fields on the mutation's payload
    field_class Types::BaseField
    # This is used for generating the `input: { ... }` object type
    input_object_class Types::BaseInputObject

    def current_user
      context[:current_user]
    end

    def current_refresh_token
      context[:current_refresh_token]
    end
  end
end