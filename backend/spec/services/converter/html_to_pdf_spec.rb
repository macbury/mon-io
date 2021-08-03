require 'rails_helper'

RSpec.describe Converter::HtmlToPdf do
  subject { described_class.new(msg_path, 'test.pdf').call }

  describe 'crunchy github file' do
    let(:msg_path) { file_fixture('github.html') }

    it { expect(File.exist?(subject)).to be(true) }
  end
end