require 'rails_helper'

RSpec.describe Favicon::FromWebpage do
  include_context 'asyncReactor'

  subject(:service) { described_class.call(url) }

  context 'when portal.pkoleasing.pl' do
    let(:url) { 'https://portal.pkoleasing.pl/' }

    before do
      stub_request(:head, 'https://portal.pkoleasing.pl/').
        to_return(status: 200, body: '', headers: { 'content-type': 'text/html' })

      stub_request(:get, 'https://portal.pkoleasing.pl/').
        to_return(status: 200, body: file_fixture('pko.html').read)

      [
        'https://portal.pkoleasing.pl/favicon.png',
        'https://portal.pkoleasing.pl/favicon.ico',
        'https://portal.pkoleasing.pl/Content/RLPL/base/images/favicon/favicon-194x194.png',
        'https://portal.pkoleasing.pl/Content/RLPL/base/images/favicon/android-chrome-192x192.png',
      ].each do |url|
        stub_request(:head, url).to_return(status: 404, body: '')
        stub_request(:get, url).to_return(status: 404, body: '')
      end

      stub_request(:head, 'https://portal.pkoleasing.pl/Content/RLPL/base/images/favicon/apple-touch-icon-180x180.png').
        to_return(status: 200, body: '')

      stub_request(:get, 'https://portal.pkoleasing.pl/Content/RLPL/base/images/favicon/apple-touch-icon-180x180.png').
        to_return(status: 200, body: '', headers: {})
    end

    it { is_expected.to eq('https://portal.pkoleasing.pl/Content/RLPL/base/images/favicon/apple-touch-icon-180x180.png') }
  end

  context 'when news.ycombinator.com' do
    let(:url) { 'https://news.ycombinator.com/' }

    before do
      stub_request(:head, 'https://news.ycombinator.com/').
        to_return(status: 200, body: '', headers: { 'content-type': 'text/html' })

      stub_request(:get, 'https://news.ycombinator.com/').
        to_return(status: 200, body: file_fixture('ycombinator.html').read)

      stub_request(:head, 'https://news.ycombinator.com/favicon.ico').
        to_return(status: 200, body: '')

      stub_request(:get, 'https://news.ycombinator.com/favicon.ico').
        to_return(status: 200, body: '', headers: {})
    end

    it { is_expected.to eq('https://news.ycombinator.com/favicon.ico') }
  end

  context 'when github.com' do
    let(:url) { 'https://github.com/' }

    before do
      stub_request(:head, 'https://github.com/').
        to_return(status: 200, body: '', headers: { 'content-type': 'text/html' })

      stub_request(:get, 'https://github.com/').
        to_return(status: 200, body: file_fixture('github_fav.html').read)

      stub_request(:any, 'https://github.githubassets.com/apple-touch-icon-180x180.png').
        to_return(status: 200, body: '', headers: {})
    end

    it { is_expected.to eq('https://github.githubassets.com/apple-touch-icon-180x180.png') }
  end

  context 'when cinkciarz.pl' do
    let(:url) { 'http://cinkciarz.pl/' }

    before do
      stub_request(:head, 'http://cinkciarz.pl/').
        to_return(status: 200, body: '', headers: { 'content-type': 'text/html' })

      stub_request(:get, 'http://cinkciarz.pl/').
        to_return(status: 200, body: file_fixture('cinkciarz.html').read)

      stub_request(:any, 'https://cinkciarz.pl/images/favicon-32x32.png?v1').
        to_return(status: 200, body: '', headers: {})
    end

    it { is_expected.to eq('https://cinkciarz.pl/images/favicon-32x32.png?v1') }
  end
end