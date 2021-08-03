module Types
  class BaseObject < GraphQL::Schema::Object
    extend Usable
    field_class Types::BaseField

    def current_user
      context[:current_user]
    end
  end
end
