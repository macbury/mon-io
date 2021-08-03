require 'rails_helper'

RSpec.shared_examples 'series' do |expected_occurences|
  it { expect { subject }.to change(Transaction, :count).by(1) }

  it 'creates Series' do
    expect { subject }.to change(Series, :count).by(1)
    expect(subject).to be_persisted
    expect(subject).to be_kind_of(Series)
  end

  it { expect(occurences).to eq(expected_occurences) }
end

RSpec.shared_examples 'series with transactions' do
  it 'uses date from transactions' do
    expect(schedule.start_time.to_date).to eq(transaction.date.to_date)
  end

  it 'has one transaction in series' do
    series = subject.reload
    expect(series.transactions.count).to eq(1)
    new_transaction = series.transactions.first

    expect(new_transaction.amount).to eq(transaction.amount)
    expect(new_transaction.location).to eq(transaction.location)
    expect(new_transaction.category).to eq(transaction.category)
  end
end

RSpec.shared_examples 'planned transaction' do |_expected_occurences|
  it { expect { subject }.to change(Transaction, :count).by(0) }

  it 'uses date from transactions' do
    expect(schedule.start_time.to_date).to eq(transaction.date.to_date)
  end

  it 'creates Series' do
    expect { subject }.to change(Series, :count).by(1)
    expect(subject).to be_persisted
    expect(subject).to be_kind_of(Series)
  end

  it 'has none transaction in series' do
    series = subject.reload
    expect(series.transactions.count).to eq(0)
  end

  it { expect(occurences).to eq([transaction.date.to_date.to_s]) }
end
