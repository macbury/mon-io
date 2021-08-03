module Categories
  # Look over all receipts that have assigned transaction.
  # The category of transactions tells us what type of category similar receipts should be
  class Learn < Service
    def call
      Receipt.with_transaction.find_each(batch_size: 100).each do |receipt|
        content = receipt.file.metadata['content']
        next if content.blank?

        classifier.train(receipt.owner.category_id, content_words(content))
      end
      Receipt.with_transaction.last.file.data.dig('metadata', 'content')

      classifier.classify(content_words(Receipt.pending.first.file.data.dig('metadata', 'content')))
    end

    private

    attr_reader :backend

    def suggest(content)
      Category.find_by(id: classifier.classify(content_words(content)))
    end

    def content_words(content)
      content.split(/\b/).reject { |word| word.strip.size < 4 || word.size > 12 }.uniq.join(' ').downcase
    end

    def classifier
      @classifier ||= ClassifierReborn::Bayes.new([])
    end
  end
end