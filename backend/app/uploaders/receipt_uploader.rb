class ReceiptUploader < Shrine
  Attacher.validate do
    validate_extension %w[jpg jpeg png pdf msg eml]
  end

  plugin :download_endpoint, prefix: 'download/receipts', host: ENV.fetch('APP_HOST')

  Attacher.derivatives do |original|
    {
      pdf: Converter::Pdf.call(original),
      txt: Converter::Txt.call(original)
      # preview: generate preview image for file
    }
  end
end