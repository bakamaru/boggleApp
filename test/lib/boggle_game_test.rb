require 'test_helper'

class BoggleGameTest < ActionDispatch::IntegrationTest
 
  test "should get result 16 letters for 4*4 board size" do
    game=BoggleGame.new
    letters=game.generate(4)
    assert_equal(16,letters.length())
    
  end 
  test "should get result 25 letters for 5*5 board size" do
    game=BoggleGame.new
    letters=game.generate(5)
    assert_equal(25,letters.length())
    
  end

end
