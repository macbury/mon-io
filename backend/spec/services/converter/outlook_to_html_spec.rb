require 'rails_helper'

RSpec.describe Converter::OutlookToHtml do
  subject { described_class.new(msg_path).call }

  let(:html_md5) { Digest::MD5.hexdigest(subject) }

  describe 'github msg file' do
    let(:msg_path) { file_fixture('github.msg') }

    it { expect(html_md5).to eq('c4c3f17a8d251cb1ef5c9d8f951ffa3e') }
  end

  describe 'crunchy msg file' do
    let(:msg_path) { file_fixture('crunchy.msg') }

    it { expect(html_md5).to eq('1bab8e33b46f9d5715797759103dfb7b') }
  end

  describe 'gab msg file' do
    let(:msg_path) { file_fixture('gab.msg') }

    it { expect(html_md5).to eq('fbbb73a6f401f8364b5f5c859b6d4205') }
  end

  describe 'plain msg file' do
    let(:msg_path) { file_fixture('plain.msg') }

    it { expect(html_md5).to eq('99f5d409ec82ca9ab3edee575c5cccf7') }
  end

  describe 'sptofify msg file' do
    let(:msg_path) { file_fixture('spotify.msg') }

    it { expect(html_md5).to eq('daed0ede3b3d5762e59b7d619dae1a39') }
  end
end