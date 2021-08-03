Rails.application.routes.draw do
  devise_for :users, skip: :all

  if Rails.env.development?
    mount Flipper::UI.app(Flipper) => '/flipper'
  end

  get '/api/software_update/download', to: 'update#download', as: :apk_download
  get '/api/software_update', to: 'update#show', as: :update
  get '/api/calendar', to: 'calendar#show', as: :calendar

  get '/favicon/*token' => 'favicon#show', as: :favicon
  match '/api', to: 'api#execute', via: %i(post get), as: :endpoint

  get '/download/backup', to: 'downloads#backup', as: :backup
  get '/download/*data', to: 'downloads#get', as: :download

  get '*path' => 'home#index'
  root 'home#index'
end
