namespace :graphql do
  desc 'Generate frontend headers'
  task dump: :environment do
    Rake::Task['graphql:schema:dump'].invoke
    frontend_path = Rails.root.join('../frontend')
    puts "Opening #{frontend_path}"
    puts `cd #{frontend_path} && yarn graphql:codegen`

    if ENV.key?('WINDOWS_MOUNT_GRAPHQL')
      puts "Copy graphql schema files to #{ENV.fetch('WINDOWS_MOUNT_GRAPHQL')}"
      puts `cp #{frontend_path.join('src/api/graphql.ts')} #{ENV.fetch('WINDOWS_MOUNT_GRAPHQL')}/src/api/`
      puts `cp #{frontend_path.join('schema.graphql')} #{ENV.fetch('WINDOWS_MOUNT_GRAPHQL')}/`
    end
  end
end