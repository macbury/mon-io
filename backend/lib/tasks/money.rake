namespace :money do
  desc "Refresh rates when called"
  task refresh_rates: :environment do
    Currency::SyncExchangeRate.call
  end
end