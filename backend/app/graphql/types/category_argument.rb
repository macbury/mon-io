module Types
  class CategoryArgument < GraphQL::Schema::Scalar
    description 'Represents category in system identified by its id'

    def self.coerce_input(category_id, _context)
      return nil if category_id.nil?

      category = Category.find_by(id: category_id)
      raise GraphQL::CoercionError, "Could not find category with id `#{category_id}` provided." unless category

      category
    end
  end
end
