class DownloadsController < ApplicationController
  use Download::ReadObject, as: :read_object
  use Backup::Create, as: :create_backup_file

  before_action :authenticate_user!, only: :backup

  def get
    record = read_object(data_param)

    if record.is_a?(Import)
      send_file record.file.download, filename: record.name
    elsif record.is_a?(Receipt)
      send_file record.file(:pdf).download, filename: 'receipt.pdf'
    else
      render status: 404
    end
  rescue Shrine::FileNotFound
    render status: 404
  end

  def backup
    send_file create_backup_file
  end

  private

  def data_param
    request.path.split('/')[-1]
  end
end