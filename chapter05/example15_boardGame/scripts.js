var keyboard = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L',';'],
  ['Z','X','C','V','B','N','M',',','.','?'],
  ['space']
];


var word_to_type = "";
var remaining_time = 30000;
var game_time = 30000;
var score = 0;
var phrase_node = null;
var typed_node = null;
var typed = "";

const d = new Date();
var start_time = d.getTime();

// Load Keyboard into table function
const load_keyboard = () => {
  let board_cells = document.querySelectorAll("#board td");
  let row = 0, col = 0;
  for( let cell of board_cells ){
    cell.textContent = keyboard[row][col++];
    if (col == 10) row++;
    col = (col) % 10;
  }
}





// Fill cells keyboard
document.addEventListener('DOMContentLoaded', 
function(e) {
  load_keyboard();
  phrase_node = document.getElementById("phrase_display");
  typed_node = document.getElementById("typed_phrase");
}
);


// keydown handler
document.addEventListener('DOMContentLoaded', 
function(e) {
              document.getElementById("pagebody").addEventListener("keydown", 
                                          function (e) {
                                            let row = 0, col = 0;
                                            let found = false;
                                            
                                            let keyPressed = e.key;
                                            for(let r = 0; r < keyboard.length; r++ ){ //iterate of keyboard rows
                                              for( let c = 0; c < keyboard[r].length; c++ ){ // iterate over row cells
                                                if( keyPressed.toLowerCase() == (keyboard[r][c]).toLowerCase() ){
                                                  row = r;
                                                  col = c;
                                                  found = true;
                                                  break;
                                                } 
                                              }
                                            }
                                            if(found){
                                              typed += keyPressed;
                                              typed_node.textContent = typed;
                                              let cell_id = "cell_" + row + "_" + col;
                                              let cell = document.getElementById(cell_id);
                                              if( cell )
                                              cell.classList.toggle('shadow');
                                              setTimeout(() => {  cell.classList.toggle('shadow'); }, 200);
                                            }
                                          }
                );
              }
);

const pick_word = () => {
  let n = Math.floor(Math.random() * (words.length));
  return words[n % words.length];
};

// Start button handler registration
document.addEventListener('DOMContentLoaded', 
                                  function(e) {
                                    let startButton = document.getElementById("btn_start");
                                    startButton.addEventListener('click',
                                        function(e){
                                          word_to_type = pick_word();
                                          phrase_node.textContent = word_to_type;
                                          while(remaining_time > 0){
                                            if(typed == word_to_type){
                                              score += word_to_type.length;
                                              word_to_type = pick_word();
                                            }
                                            remaining_time = game_time - (d.getTime() - start_time);
                                          }
                                        }
                                    );
                                  }
);

//Main loop
