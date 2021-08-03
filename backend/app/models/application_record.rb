class ApplicationRecord < ActiveRecord::Base
  extend Usable
  self.abstract_class = true
end
