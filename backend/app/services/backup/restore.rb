module Backup
  class Restore < Service
    def call
      log "Restore dump: #{psql.command(options)}"
      log psql.run(options)
    end

    private

    def options
      {
        input_path: input_path,
        host: ActiveRecord::Base.connection_config[:host],
        db: ActiveRecord::Base.connection_config[:database],
        user: ActiveRecord::Base.connection_config[:username],
        port: ActiveRecord::Base.connection_config[:port]
      }
    end

    def environment
      {
        'PGPASSWORD' => ActiveRecord::Base.connection_config[:password]
      }
    end

    def input_path
      @input_path ||= Rails.root.join('tmp/dump.sql')
    end

    def psql
      @psql ||= Terrapin::CommandLine.new(
        'psql',
        '-h :host -p :port -U :user :db < :input_path',
        environment: environment
      )
    end
  end
end