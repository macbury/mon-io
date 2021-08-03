require 'rails_helper'

RSpec.describe Converter::EmlToHtml do
  subject { described_class.new(msg_path).call }

  let(:html_md5) { Digest::MD5.hexdigest(subject) }

  describe 'ha eml file' do
    let(:msg_path) { file_fixture('ha.eml') }

    it { expect(html_md5).to eq('e4e20e424cfebfe8a61881cc95c3dd80') }
  end
end