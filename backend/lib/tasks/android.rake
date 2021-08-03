namespace :android do
  desc 'Generate FDroid repo'
  task repo: :environment do
    Android::Repo.call
  end
end