class GraphPolicy
  RULES = {
    Types::MutationType => {
      quickSignIn: ->(_obj, _args, _ctx) { true },
      signIn: ->(_obj, _args, _ctx) { true },
      refreshAccessToken: ->(_obj, _args, _ctx) { true },
      logout: ->(_obj, _args, _ctx) { true },
      '*': ->(_obj, _args, ctx) { logged_in?(ctx) }
    },
    Types::QueryType => {
      about: ->(_obj, _args, _ctx) { true },
      nonce: ->(_obj, _args, _ctx) { true },
      '*': ->(_obj, _args, ctx) { logged_in?(ctx) }
    }
  }.freeze

  def self.guard(type, field)
    type.introspection? ? ->(_obj, _args, _ctx) { true } : RULES.dig(type.metadata[:type_class], field)
  end

  # Check if user is logged in
  def self.logged_in?(ctx)
    ctx[:current_user].present?
  end
end
