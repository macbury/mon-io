def deep_reject(hash, &block)                                                   
  hash.each_with_object({}) do |(k, v), memo|                                        
    unless block.call(k, v)                                                          
      if v.is_a?(Hash)                                                               
        memo[k] = deep_reject(v, &block)                                             
      else                                                                           
        memo[k] = v                                                                  
      end                                                                            
    end                                                                              
  end                                                                                
end   

namespace :translations do
  desc 'Dump translations to json'
  task dump: :environment do
    I18n.backend.reload!
    I18n.backend.eager_load!
    locales_path = Rails.root.join('../frontend/src/config/locales.json')
    puts "Generating locales: #{locales_path}"
    file = File.new(locales_path, 'w')
    translations = deep_reject(I18n.backend.translations) { |k, v| v.is_a?(Proc) }
    file.write JSON.pretty_generate(translations)
    file.close

    if ENV.key?('WINDOWS_MOUNT_LOCALES_PATH')
      puts 'Copy locales files'
      puts `cp ../frontend/src/config/locales.json #{ENV.fetch('WINDOWS_MOUNT_LOCALES_PATH')}`
    end
  end
end