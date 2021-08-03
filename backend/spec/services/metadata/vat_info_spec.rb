require 'rails_helper'

RSpec.describe Metadata::VatInfo do
  subject { described_class.new(vat_number: vat_number, country_code: country_code).call }

  describe 'get empik data', vcr: 'metadata/vat/empik' do
    let(:vat_number) { 5_260_207_427 }
    let(:country_code) { 'PL' }

    it 'returns name and address' do
      expect(subject).to eq(
        name: 'Empik Spółka Akcyjna',
        address: "Marszałkowska 116/122\n00 017 Warszawa"
      )
    end
  end

  describe 'invalid nip', vcr: 'metadata/vat/invalid' do
    let(:vat_number) { 12_345 }
    let(:country_code) { 'PL' }

    it { is_expected.to be_falsey }
  end
end
