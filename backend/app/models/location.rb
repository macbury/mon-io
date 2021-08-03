class Location < ApplicationRecord
  validates :name, :full_address, :city, :country, :lat, :lng, presence: true
  has_many :category_location_suggestions, dependent: :destroy
  has_many :transactions, dependent: :destroy

  acts_as_mappable lat_column_name: :lat,
                   lng_column_name: :lng
end
