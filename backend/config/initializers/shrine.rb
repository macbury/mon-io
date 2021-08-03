require 'shrine'
require 'shrine/storage/file_system'

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new('tmp', prefix: 'uploads/cache'),
  store: Shrine::Storage::FileSystem.new('storage', prefix: 'uploads')
}

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data
Shrine.plugin :restore_cached_data
Shrine.plugin :validation
Shrine.plugin :derivatives
Shrine.plugin :validation_helpers
Shrine.plugin :determine_mime_type, analyzer: :marcel
Shrine.plugin :signature
Shrine.plugin :add_metadata