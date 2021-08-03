max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { 1 }
threads min_threads_count, max_threads_count
environment ENV.fetch("RAILS_ENV") { "development" }
pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }

workers ENV.fetch("WEB_CONCURRENCY") { 1 }
preload_app!

plugin :tmp_restart

on_worker_boot do
  ActiveRecord::Base.establish_connection
end

port ENV.fetch("PORT") { 3000 }

if Rails.env.development?
  localhost_key = "#{Dir.pwd}/#{File.join('tmp', 'localhost.key')}"
  localhost_cert = "#{Dir.pwd}/#{File.join('tmp', 'localhost.crt')}"

  unless File.exist?(localhost_key)
    def generate_root_cert(root_key)
      root_ca = OpenSSL::X509::Certificate.new
      root_ca.version = 2 # cf. RFC 5280 - to make it a "v3" certificate
      root_ca.serial = 0x0
      root_ca.subject = OpenSSL::X509::Name.parse "/C=BE/O=A1/OU=A/CN=localhost"
      root_ca.issuer = root_ca.subject # root CA's are "self-signed"
      root_ca.public_key = root_key.public_key
      root_ca.not_before = Time.now
      root_ca.not_after = root_ca.not_before + 2 * 365 * 24 * 60 * 60 # 2 years validity
      root_ca.sign(root_key, OpenSSL::Digest::SHA256.new)
      root_ca
    end

    root_key = OpenSSL::PKey::RSA.new(2048)
    file = File.new( localhost_key, "wb")
    file.write(root_key)
    file.close

    root_cert = generate_root_cert(root_key)
    file = File.new( localhost_cert, "wb")
    file.write(root_cert)
    file.close
  end

  ssl_bind '0.0.0.0', ENV.fetch("PORT") { 4100 }, {
    key: localhost_key,
    cert: localhost_cert,
    verify_mode: "none"
  }
end