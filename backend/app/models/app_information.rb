# Gives you basic information about current application
class AppInformation
  include Singleton

  def version
    @version ||= begin
      if version_file_path.exist?
        JSON.parse(version_file_path.read).dig('version').to_s
      else
        `git describe --tags --abbrev=0`
      end.strip.delete('v')
    end
  end

  def commit
    @commit ||= begin
      if commit_sha_file_path.exist?
        commit_sha_file_path.read
      else
        `git rev-list HEAD --max-count=1 --abbrev-commit`
      end.strip
    end
  end

  def rails_version
    Rails::VERSION::STRING
  end

  def ruby_version
    RUBY_VERSION
  end

  def to_h
    {
      monio_version: version,
      commit: commit,
      rails_version: rails_version,
      ruby_version: RUBY_VERSION
    }
  end

  def to_json
    to_h.to_json
  end

  private

  def version_file_path
    @version_file_path ||= Rails.root.join('app.json')
  end

  def commit_sha_file_path
    @commit_sha_file_path ||= Rails.root.join('COMMIT')
  end
end