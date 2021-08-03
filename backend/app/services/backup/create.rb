module Backup
  class Create < Service
    def call
      info "Creating dump: #{pg_dump.command(options)}"
      info pg_dump.run(options)
      output_path
    end

    private

    def options
      {
        output_path: output_path,
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

    def output_path
      @output_path ||= Dir::Tmpname.create(['database', '.sql']) {}
    end

    def pg_dump
      @pg_dump ||= Terrapin::CommandLine.new(
        'pg_dump',
        '--port :port --host :host --username :user --verbose --clean --no-owner --no-acl --format=p :db > :output_path',
        environment: environment
      )
    end
  end
end