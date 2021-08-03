class UpdateController < ApplicationController
  def show
    render json: {
      versionName: AppInformation.instance.version,
      versionCode: AppInformation.instance.version.to_f,
      apkUrl: Rails.application.routes.url_helpers.apk_download_url,
      forceUpdate: false
    }
  end

  def download
    response.headers['Content-Length'] = File.size(android_path)
    send_file android_path, filename: "monio-#{AppInformation.instance.version}.apk"
  end

  private

  def android_path
    Rails.root.join('android/monio.apk')
  end
end