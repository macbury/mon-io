module Resolvers
  class AllImports < Base
    include SearchObject.module(:graphql)

    scope { current_user.imports.order('created_at DESC') }

    type Types::ImportType.connection_type, null: false

    ImportStateEnum = GraphQL::EnumType.define do
      name 'ImportStateEnum'

      value 'All'
      value 'Processed'
      value 'NotProcessed'
    end

    option(:state, type: ImportStateEnum, default: 'All', required: false)

    def apply_state_with_all(scope)
      scope
    end

    def apply_state_with_processed(scope)
      scope.processed
    end

    def apply_state_with_not_processed(scope)
      scope.not_processed
    end
  end
end