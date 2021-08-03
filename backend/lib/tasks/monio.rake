namespace :monio do
  desc 'Generate about.json in frontend/src/about.json'
  task dump_info: :environment do
    file = File.new(Rails.root.join('about.json'), 'w')
    file.write AppInformation.instance.to_json
    file.close

    puts `cp ./about.json ../frontend/src/about.json`

    if ENV.key?('WINDOWS_MOUNT_ABOUT_PATH')
      puts "cp ../frontend/src/about.json #{ENV.fetch('WINDOWS_MOUNT_ABOUT_PATH')}"
      puts `cp ../frontend/src/about.json #{ENV.fetch('WINDOWS_MOUNT_ABOUT_PATH')}`
    end
  end
end