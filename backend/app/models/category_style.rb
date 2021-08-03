module CategoryStyle
  Colors = %w(
    #f44236
    #ea1e63
    #9c28b1
    #673bb7
    #3f51b5
    #2196f3
    #03a9f5
    #00bcd5
    #009788
    #4cb050
    #8bc24a
    #cddc39
    #ffeb3c
    #ffc928
    #ff9700
    #fe5722
    #795547
    #9e9e9e
    #607d8b
  ).freeze
  MaterialIcons = %w(local-movies healing computer)
  MaterialCommunityIcons = %w(barrel ethereum bitcoin safe desk-lamp cat cannabis brush tshirt-v food-fork-drink shopping car gift-outline fuel skull pirate coin cellphone home baby-buggy bank)
  Icons = MaterialIcons.map { |icon| "MaterialIcons:#{icon}" } +
          MaterialCommunityIcons.map { |icon| "MaterialCommunityIcons:#{icon}" }
end