module Resolvers
  class AllUsers < Base
    include SearchObject.module(:graphql)
    description 'List all users in system'

    scope { User.all }

    type [Types::ProfileType], null: false
  end
end