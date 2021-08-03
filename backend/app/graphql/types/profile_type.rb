module Types
  class ProfileType < BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :avatar_url, String, null: false

    def avatar_url
      Identicon.data_url_for(object.username)
    end
  end
end
