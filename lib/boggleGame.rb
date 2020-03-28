class BoggleGame
  include HTTParty
    @@board_size=4;
    @@letters = ["E", "B", "O", "C", "A", "D", "F", "G", "H", "J", "U", "K", "L", "E", "I", "N", "U", "O", "P", "Q", "A", "R", "S", "T", "V", "W", "X", "Y", "E", "I", "Z", "B", "U", "C", "D", "O", "F", "I", "G", "H", "A", "J", "K", "L", "E", "N", "P", "U", "Q", "R", "E", "S", "O", "T", "V", "A", "W", "X", "Y", "A", "Z", "I", "B", "U", "I", "C", "D", "A", "F", "O", "G", "H", "J", "E", "K", "L", "N", "P", "U", "O", "E", "Q", "R", "S", "T", "V", "I", "W", "X", "E", "Y", "Z", "A"];
    def initialize()
     
    end
    
    def generate(size)
       squar_boardSize= size ** 2
       board_letters=[];
       i = 0
       loop do
         i += 1
    
        number = (rand() * @@letters.size()).floor(0);
        board_letters.push(@@letters[number])
          if i == squar_boardSize
            break 
          end
        end
   #board_letters.each{ |name| puts name }
      return board_letters
   end
      
   
   end