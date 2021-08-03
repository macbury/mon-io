module Types
  class AboutType < Types::BaseObject
    field :monio_version, String, null: false
    field :commit, String, null: false
    field :rails_version, String, null: false
    field :ruby_version, String, null: false
  end
end
