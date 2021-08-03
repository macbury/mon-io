require 'rails_helper'

RSpec.describe Receipt, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:category).optional }
    it { is_expected.to belong_to(:owner).optional }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of :file }

    it 'prevents creation of duplicates' do
      create(:receipt, :with_user, file: File.open(file_fixture('sample.pdf')))
      receipt_b = build(:receipt, :with_user, file: File.open(file_fixture('sample.pdf')))

      expect(receipt_b.save).to be(false)
      expect(receipt_b.errors.full_messages).to eq(['File has already been taken'])
    end
  end

  context 'signatures' do
    it 'generates signatures' do
      receipt_b = create(:receipt, :with_user, file: File.open(file_fixture('sample.pdf')))
      expect(receipt_b).to be_persisted
      expect(receipt_b.signature).to eq('4b41a3475132bd861b30a878e30aa56a')
    end
  end

  context 'implements Geocodable' do
    subject { build(:receipt, :with_user, :near_kfc) }

    it 'generates location and assigns it to created reciept', vcr: 'reverse/kfc' do
      expect { subject.save }.to change(Location, :count).by(1)
      expect(subject.location).to be_persisted
      expect(subject.location.name).to eq('KFC')
    end
  end
end
