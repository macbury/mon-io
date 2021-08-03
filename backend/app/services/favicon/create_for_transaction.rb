module Favicon
  class CreateForTransaction < Service
    def initialize(transaction:, url:)
      @transaction = transaction
      @url = url
    end

    def call
      if url.blank?
        transaction.update!(link: nil)
        return
      end

      link = Link.find_or_create_by!(url: url)
      transaction.update!(link: link)
      link
    end

    private

    attr_reader :transaction, :url
  end
end