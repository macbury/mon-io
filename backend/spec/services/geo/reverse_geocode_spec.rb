require 'rails_helper'

RSpec.describe Geo::ReverseGeocode do
  subject { described_class.new(lat: lat, lng: lng).call }

  describe 'get location ikea', vcr: 'reverse/ikea' do
    let(:lat) { 50.08920 }
    let(:lng) { 19.89742 }

    it { is_expected.to be_persisted }
  end

  describe 'get location for port com', vcr: 'reverse/port_com' do
    let(:lat) { 50.0612029 }
    let(:lng) { 19.9313488 }

    it { is_expected.to be_persisted }

    it { expect(subject.id).to eq('9F2X3W6J+GG') }
    it { expect(subject.name).to eq('Jabłonowskich') }
    it { expect(subject.category).to eq('yes') }
    it { expect(subject.city).to eq('Kraków') }
    it { expect(subject.postcode).to eq('31-114') }
    it { expect(subject.country).to eq('pl') }
    it { expect(subject.suburb).to eq('Stare Miasto') }
  end

  describe 'get location for House of beer', vcr: 'reverse/house_of_beer' do
    let(:lat) { 50.06192 }
    let(:lng) { 19.94240 }

    it { is_expected.to be_persisted }

    it { expect(subject.id).to eq('9F2X3W6R+QX') }
    it { expect(subject.name).to eq('Kamienica Hobermanowska') }
    it { expect(subject.category).to eq('yes') }
    it { expect(subject.city).to eq('Kraków') }
    it { expect(subject.postcode).to eq('31-028') }
    it { expect(subject.country).to eq('pl') }
    it { expect(subject.suburb).to eq('Stare Miasto') }
  end

  describe 'get location for GK', vcr: 'reverse/gk' do
    let(:lat) { 50.067782 }
    let(:lng) { 19.946255 }

    it { is_expected.to be_persisted }

    it { expect(subject.id).to eq('9F2X3W9W+2F') }
    it { expect(subject.name).to eq('Galeria Krakowska') }
    it { expect(subject.category).to eq('mall') }
    it { expect(subject.city).to eq('Kraków') }
    it { expect(subject.postcode).to eq('31-154') }
    it { expect(subject.country).to eq('pl') }
    it { expect(subject.suburb).to eq('Stare Miasto') }
  end

  describe 'get location for orlen', vcr: 'reverse/orlen' do
    let(:lat) { 50.088120 }
    let(:lng) { 20.005586 }

    it { is_expected.to be_persisted }

    it { expect(subject.id).to eq('9G2232Q4+56') }
    it { expect(subject.name).to eq('Orlen') }
    it { expect(subject.category).to eq('fuel') }
    it { expect(subject.city).to eq('Kraków') }
    it { expect(subject.postcode).to eq('31-873') }
    it { expect(subject.country).to eq('pl') }
    it { expect(subject.suburb).to eq('Czyżyny') }
  end

  describe 'get location for kfc', vcr: 'reverse/kfc' do
    let(:lat) { 50.087032 }
    let(:lng) { 20.005092 }

    it { is_expected.to be_persisted }

    it { expect(subject.id).to eq('9G2232P4+V2') }
    it { expect(subject.name).to eq('KFC') }
    it { expect(subject.category).to eq('fast_food') }
    it { expect(subject.city).to eq('Kraków') }
    it { expect(subject.postcode).to eq('31-859') }
    it { expect(subject.country).to eq('pl') }
    it { expect(subject.suburb).to eq('Osiedle Dywizjonu 303') }
  end

  describe 'get location for work', vcr: 'reverse/work' do
    let(:lat) { 50.065437 }
    let(:lng) { 19.975507 }

    it { is_expected.to be_persisted }

    it { expect(subject.id).to eq('9F2X3X8G+65') }
    it { expect(subject.name).to eq('Fabryczna') }
    it { expect(subject.category).to eq('yes') }
    it { expect(subject.city).to eq('Kraków') }
    it { expect(subject.postcode).to eq('31-545') }
    it { expect(subject.country).to eq('pl') }
    it { expect(subject.suburb).to eq('Grzegórzki') }
  end
end