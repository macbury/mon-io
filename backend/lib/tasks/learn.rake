namespace :learn do
  desc 'Learns what type of category should have each location'
  task locations: :environment do
    Categories::LearnLocation.call
  end

  desc 'Learn content'
  task content: :environment do
    Categories::Learn.call
  end
end