module Types
  class CategoryStyleType < Types::BaseObject
    field :icons, [String], null: false
    field :colors, [String], null: false

    def icons
      CategoryStyle::Icons
    end

    def colors
      CategoryStyle::Colors
    end
  end
end
