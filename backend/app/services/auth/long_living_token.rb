module Auth
  class LongLivingToken < Service
    def initialize(user:, ip:, name:)
      @user = user
      @ip = ip
      @name = name
    end

    def call
      user.refresh_tokens.create!(
        ip: ip,
        name: name,
        kind: 'long'
      )
    end

    private

    attr_reader :user, :ip, :name
  end
end