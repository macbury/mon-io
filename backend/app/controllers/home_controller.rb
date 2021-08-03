class HomeController < ApplicationController
  def index
    index_path = Rails.root.join('public/index.html')

    if File.exist?(index_path)
      content = File.open(index_path).read
      render html: content.html_safe, layout: false
    else
      render status: :not_found
    end
  end
end