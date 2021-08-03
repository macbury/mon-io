namespace :db do
  desc 'Restore dump from tmp/dump.sql'
  task restore: :environment do
    Rake::Task['db:drop'].invoke
    Rake::Task['db:create'].invoke
    Backup::Restore.call
    Rake::Task['db:migrate'].invoke
    Rake::Task['data:migrate'].invoke
  end

  desc 'Anomize user'
  task anomize: :environment do
    User.all.each do |user|
      user.password = user.password_confirmation = 'admin1234'
      user.save!
    end
  end

  desc 'Have some fun in your database'
  task playground: :environment do
    ActiveRecord::Base.transaction do
      Pry.start
    ensure
      raise ActiveRecord::Rollback
    end
  end
end