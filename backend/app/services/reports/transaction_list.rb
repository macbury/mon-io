module Reports
  class TransactionList < Service
    LAST_COLUMN = 'F'.freeze

    def initialize(transactions)
      @transactions = transactions
    end

    def call
      package.workbook.add_worksheet(name: 'Transactions') do |sheet|
        sheet.add_row headers
        sheet.column_widths 12, 16, 15, 35, 35
        row = 1

        transactions.limit(nil).offset(nil).order('date DESC').find_each do |transaction|
          sheet.add_row [
            transaction.date,
            transaction.category.name,
            transaction.exchanged_amount.format,
            transaction&.location&.name || '-',
            transaction.notes,
            transaction_url(transaction)
          ]

          row += 1
          sheet.add_hyperlink location: transaction_url(transaction), target: :internal, ref: "F#{row}", display: 'AXSLX'
          sheet.add_style "B#{row}", b: true, fg_color: transaction.category.color.delete('#')
        end

        sheet.add_row [
          nil,
          'Sum',
          "=SUM(C2:C#{row})",
          nil,
          nil,
          nil
        ]

        sheet.add_table(
          "A1:#{LAST_COLUMN}#{row}",
          name: 'Transactions',
          style_info: {
            show_row_stripes: true,
            name: 'TableStyleMedium7'
          }
        )

        sheet.add_style "A1:#{LAST_COLUMN}#{row}", sz: 12 # make it bigger
      end

      {
        filename: 'transactions.xlsx',
        data: package.to_stream.read
      }
    end

    private

    attr_reader :transactions

    def package
      @package ||= Axlsx::Package.new
    end

    def headers
      %w[Date Category Amount Location Notes Url]
    end

    def transaction_url(transaction)
      URI.join(
        Rails.application.routes.url_helpers.root_url,
        '/transactions',
        transaction.id
      ).to_s
    end
  end
end