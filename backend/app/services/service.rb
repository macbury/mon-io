class Service
  extend Usable

  def self.call(*args, **kwargs, &block)
    new(*args, **kwargs).call(&block)
  end

  def crypt
    @crypt ||= ActiveSupport::MessageEncryptor.new(secret_key)
  end

  def secret_key
    Rails.application.secrets.secret_key_base.byteslice(0..31)
  end

  def internet
    Thread.current[:async_job_internet] ||= Async::HTTP::Internet.new
  end

  private

  def log(msg)
    Rails.logger.info "[#{self.class.name}] #{msg}"
  end

  def info(msg)
    Rails.logger.info "[#{self.class.name}] #{msg}"
  end

  def error(msg)
    Rails.logger.error "[#{self.class.name}] #{msg}"
  end
end