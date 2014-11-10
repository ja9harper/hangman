var wordList = ['begonia', 'petunia', 'gladiola', 'daffodil', 'crocus', 'hyacynth', 'lavendar', 'violet', 'honeysuckle', 'lily', 'juniper']

var wordNum = -1

wordList = Game.shuffle(wordList)
var wordStatus = new Game.Status(' ', [150, 435], 'center');
wordStatus.fontSize = 20;
var gameover = false;

var wrongStatus = new Game.Status(' ', [400, 55], 'center')
wrongStatus.fontSize = 20;
var wrongLetters = " ";


function drawHangmanBorders(color, sWidth) {
  var b1 = new Shape.Rectangle(5, 5, 295, 345, 8);
  b1.strokeColor = color;
  b1.strokeWidth = sWidth;
  var b2 = new Shape.Rectangle(5, 355, 295, 140, 8);
  b2.strokeColor = color;
  b2.strokeWidth = sWidth;
  var b3 = new Shape.Rectangle(305, 5, 190, 345, 8);
  b3.strokeColor = color;
  b3.strokeWidth = sWidth;
  var b4 = new Shape.Rectangle(305, 355, 190, 70, 8);
  b4.strokeColor = color;
  b4.strokeWidth = sWidth;
}
var nextButton = new Game.Button('next word', 340, 440, nextWord);
nextButton.fillColor = 'darkGrey';
nextButton.textColor = 'black';


function nextWord() {
  gameover = false;
  wrongLetters = "";
  wrongStatus.content = wrongLetters;
  Game.setBackgroundColor('white')
  wordNum ++;
  if (wordNum < wordList.length){
    word = []
    for(var i = 0; i < wordList[wordNum].length; i ++) { 
      word[i] = '_';
    }
    wordStatus.content = word.join(' ');
  } else {
    wordStatus.content = "No more words";

  }
}

function goodGuess(letter) {
  var w = wordList[wordNum];
   for (var i = 0; i < w.length; i++) {
    if (w[i] == letter) {
      word[i] = letter;
    }
   }
   wordStatus.content = word.join(' ');
    if (word.join('').indexOf('_') == -1) {
      gameover = true;
      Game.setBackgroundColor('green')
  }
}
function badGuess(letter) {
  if (wrongLetters.indexOf(letter) == -1) {
    wrongLetters += letter + '\n';
    wrongStatus.content = wrongLetters;
  }
}
function onKeyDown(e) {
  if (gameover) return;
  if (wordList[wordNum].indexOf(e.key) == -1) {
    badGuess(e.key);
  } else {
    goodGuess(e.key);
  }
}

drawHangmanBorders('darkGrey', 2);
nextWord();