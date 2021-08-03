module Resolvers
  class AllCategories < Base
    include SearchObject.module(:graphql)

    scope do
      Category.for_user(current_user).order('name asc')
    end

    type Types::CategoryType.connection_type, null: false
  end
end