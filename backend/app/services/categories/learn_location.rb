module Categories
  # Check how many transactions are in each location and then find what is the most popular category for it
  class LearnLocation < Service
    MIN_NUMBER_OF_TRANSACTIONS = 3

    def call
      CategoryLocationSuggestion.delete_all

      each_group do |location_id, (rank, category)|
        category.category_location_suggestions.create(
          rank: rank,
          location_id: location_id
        )
      end
    end

    private

    def each_group(&_block)
      Category.all.each do |category|
        groups = category.transactions.group(:location_id).count

        groups.each do |location_id, number_of_transactions|
          next unless location_id
          next if number_of_transactions <= MIN_NUMBER_OF_TRANSACTIONS

          total_transactions = Transaction.where(location_id: location_id).count

          rank = (number_of_transactions.to_f / total_transactions)
          yield [location_id, [rank, category]]
        end
      end
    end
  end
end