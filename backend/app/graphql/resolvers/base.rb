module Resolvers
  class Base < GraphQL::Schema::Resolver
    extend Usable

    def current_user
      context[:current_user]
    end
  end
end