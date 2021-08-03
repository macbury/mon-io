module Types
  class LinkType < Types::BaseObject
    field :id, ID, null: false
    field :url, String, null: false

    field :favicon_url, String, null: false

    def favicon_url
      Rails.application.routes.url_helpers.favicon_url(token: TokenScopes.favicon_token(link_id: object.id))
    end
  end
end
