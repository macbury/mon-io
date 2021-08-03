require 'rails_helper'

RSpec.describe Download::Tesseract do
  subject { described_class.new(languages, models_path: models_path).call }

  let!(:models_path) { Pathname.new(Dir.mktmpdir(['tesseract'])) }

  describe 'download train data for polish and english language', vcr: 'tesseract' do
    let(:languages) { %w[pol eng] }

    before { subject }

    it { expect(File.exist?(models_path.join('pol.traineddata'))).to be(true) }
    it { expect(File.exist?(models_path.join('eng.traineddata'))).to be(true) }

    it { expect(subject).to eq(models_path) }
  end
end