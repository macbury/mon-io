class FaviconController < ApplicationController
  use Download::ReadFavicon, as: :favicon_from_token
  use Download::ResolveUrl, as: :resolve_url
  use Download::Get, as: :download_url
  use Favicon::FromWebpage, as: :get_favicon_url

  def show
    source_url = favicon_from_token(token_param)
    Rails.logger.info "Source url: #{source_url}"

    final_page_url = resolve_url(source_url)
    favicon_url = get_favicon_url(final_page_url)

    if favicon_url
      send_data download_url(url: favicon_url), disposition: 'inline', filename: File.basename(URI(favicon_url).path)
    else
      render status: :not_found
    end
  rescue ServiceFailure => e
    Rails.logger.error "Could proxy this favicon: #{e}"
    render status: :unprocessable_entity
  end

  private

  def token_param
    params.require(:token) + '.' + params.require(:format)
  end
end
