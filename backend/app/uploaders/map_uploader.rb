class MapUploader < Shrine
  Attacher.validate do
    validate_extension %w[png]
  end

  plugin :download_endpoint, prefix: 'download/map', host: ENV.fetch('APP_HOST')
end