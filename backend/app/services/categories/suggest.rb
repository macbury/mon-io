module Categories
  # Check what is best category for location
  # Check what is best category based on content
  class Suggest < Service
    def initialize(receipt)
      @receipt = receipt
    end

    def call
      receipt.category ||= search_category
      receipt.save
    end

    private

    attr_reader :receipt

    def search_category
      return unless receipt.location

      receipt.location.category_location_suggestions.order('rank DESC').first&.category
    end
  end
end