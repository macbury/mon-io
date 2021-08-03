module Types
  class Base64FileType < BaseObject
    field :id, ID, null: false
    field :filename, String, null: false
    field :data, String, null: false
    field :url, String, null: false

    def data
      Base64.strict_encode64(object[:data])
    end

    def id
      Digest::SHA512.hexdigest(object[:data])
    end

    def url
      "data:#{mime_type};base64,#{data}"
    end

    def mime_type
      MimeMagic.by_path(object[:filename])
    end
  end
end
