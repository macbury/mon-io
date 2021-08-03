namespace :refresh_token do
  desc 'Remove old refresh tokens'
  task expire: :environment do
    RefreshToken.old.delete_all
  end
end