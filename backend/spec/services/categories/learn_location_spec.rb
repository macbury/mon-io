require 'rails_helper'

RSpec.describe Categories::LearnLocation do
  subject { described_class.call }

  it 'calculate ranks for locations per category' do
    location_a = create(:location)
    category_a = create(:category)

    location_b = create(:location)
    category_b = create(:category)

    create_list(:transaction, 5, :with_author, location: location_a, category: category_a)
    create_list(:transaction, 5, :with_author, location: location_a, category: category_b)
    create_list(:transaction, 10, :with_author, location: location_b, category: category_b)

    expect { subject }.to change(CategoryLocationSuggestion, :count).by(3)

    expect(category_a.category_location_suggestions.count).to eq(1)

    suggestion = category_a.category_location_suggestions.first
    expect(suggestion.location).to eq(location_a)
    expect(suggestion.rank).to eq(0.5)

    expect(category_b.category_location_suggestions.count).to eq(2)

    suggestion_a, suggestion_b = category_b.category_location_suggestions.all

    expect(suggestion_a.rank).to eq(0.5)
    expect(suggestion_a.location).to eq(location_a)

    expect(suggestion_b.rank).to eq(1.0)
    expect(suggestion_b.location).to eq(location_b)
  end
end