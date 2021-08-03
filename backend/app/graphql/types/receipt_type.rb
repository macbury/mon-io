module Types
  class ReceiptType < BaseObject
    use Download::GenerateUrl, as: :generate_url

    field :id, ID, null: false
    field :content, String, null: true, description: 'Extracted content of the receipt'
    field :category, CategoryType, null: true
    field :location, LocationType, null: true
    field :user, UserType, null: false
    field :file_url, String, null: false, description: 'Url with converted receipt in pdf format'
    field :name, String, null: false
    field :mime_type, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :attached, Boolean, null: false, description: 'Is this receipt already attached to transaction'

    def file_url
      generate_url(object, context[:refresh_token])
    end

    def content
      object.file(:txt).read&.force_encoding('UTF-8')
    end

    def name
      object.file.metadata['filename']
    end

    def mime_type
      object.file.metadata['mime_type']
    end

    def attached
      object.transaction_id.present?
    end
  end
end
