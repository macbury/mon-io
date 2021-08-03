module Types
  class ImportType < BaseObject
    use Download::GenerateUrl, as: :generate_url

    field :id, ID, null: false
    field :category, CategoryType, null: true
    field :user, UserType, null: false
    field :file_url, String, null: false, description: 'Url with csv data'
    field :name, String, null: false
    field :mime_type, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :from_line, Integer, null: false
    field :to_line, Integer, null: false
    field :delimiter, String, null: true
    field :encoding, String, null: true

    field :notes_column, Integer, null: true
    field :amount_column, Integer, null: true
    field :date_column, Integer, null: true

    field :transaction_count, Integer, null: false

    field :content, String, null: true do
      argument :encoding, type: String, required: false
    end

    def file_url
      generate_url(object, context[:refresh_token])
    end

    def mime_type
      object.file.metadata['mime_type']
    end

    def transaction_count
      object.transactions.count
    end

    def content(encoding: nil)
      object.file.read.force_encoding(encoding.presence ? encoding : object.encoding).encode('utf-8', invalid: :replace, undef: :replace, replace: '?')
    end
  end
end
