class CsvUploader < Shrine
  Attacher.validate do
    validate_extension %w[csv]
  end
end