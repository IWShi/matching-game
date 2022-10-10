var cards = [];
var ctx = [];
var cardSymbols = [];
var symbols = [
  "red oval", "blue oval", "yellow rectangle", "orange rectangle", "green rectangle", "black rectangle",
  "purple triangle", "gray triangle", "maroon triangle", "deeppink triangle", "saddlebrown oval", "magenta oval",
  "red oval", "blue oval", "yellow rectangle", "orange rectangle", "green rectangle", "black rectangle",
  "purple triangle", "gray triangle", "maroon triangle", "deeppink triangle", "saddlebrown oval", "magenta oval",
]
var pair = false;
var picked = [];
var matched = [];
var moves = 0;
var matches = 0;
var best = null;

function numGenerator(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "initial";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("cards").style.display = "initial";
  
  for (i = 0; i < 24; i++) {
    cards.push(document.getElementById((i + 1).toString()));
    ctx.push(cards[i].getContext("2d"));
    ctx[i].fillStyle = "#FFCCCF";
    ctx[i].fillRect(0, 0, cards[i].width, cards[i].height);

    var index = numGenerator(0, symbols.length);
    cardSymbols.push(symbols[index]);
    symbols.splice(index, 1);
  }
}

function showSymbol(card) {
  var index = card - 1;
  if (picked.indexOf(index) == -1 && matched.indexOf(index) == -1) {
    picked.push(index);
    var draw = cardSymbols[index].split(" ");
    ctx[index].fillStyle = draw[0];
    switch (draw[1]) {
      case "oval":
      ctx[index].beginPath();
      ctx[index].arc(cards[index].width / 2, cards[index].height / 2, cards[index].height / 4, 0, 2 * Math.PI);
      ctx[index].fill();
      break;

      case "rectangle":
      ctx[index].beginPath();
      ctx[index].fillRect(cards[index].width / 4, cards[index].height / 4, cards[index].width / 2, cards[index].height / 2);
      break;

      case "triangle":
      ctx[index].beginPath();
      ctx[index].moveTo(cards[index].width * 0.75, cards[index].height / 4);
      ctx[index].lineTo(cards[index].width * 0.75, cards[index].height * 0.75);
      ctx[index].lineTo(cards[index].width / 4, cards[index].height / 2);
      ctx[index].fill();
      break;
    }

    if (pair == true) {
      moves++;
      document.getElementById("countMoves").innerHTML = "Moves: " + moves.toString();
      if (cardSymbols[picked[0]] == cardSymbols[picked[1]]) {
        matched = matched.concat(picked);
        picked = [];
        matches++;
        if (matches == 12) {
          document.getElementById("countMoves").innerHTML = "YOU WIN";
          setTimeout(endGame, 1000);
        }
      } else {
        setTimeout(function() {clearScreen()}, 250);
      }
      pair = false;
    } else {
      pair = true;
    }
  }
}

function clearScreen() {
  for (i of picked) {
    ctx[i].fillStyle = "#FFCCCF";
    ctx[i].fillRect(0, 0, cards[i].width, cards[i].height);
  }
  picked = [];
  clear = false;
}

function endGame() {
  if (best == null || moves < best) {
    best = moves;
  }
  document.getElementById("cards").style.display = "none";
  document.getElementById("gameOver").style.display = "initial";
  document.getElementById("moveCount").innerHTML = "Number of Moves: " + moves.toString();
  document.getElementById("bestMoveCount").innerHTML = "Best Number of Moves: " + best.toString();
  cards = [];
  ctx = [];
  cardSymbols = [];
  symbols = [
    "red oval", "blue oval", "yellow rectangle", "orange rectangle", "green rectangle", "black rectangle",
    "purple triangle", "gray triangle", "maroon triangle", "deeppink triangle", "saddlebrown oval", "magenta oval",
    "red oval", "blue oval", "yellow rectangle", "orange rectangle", "green rectangle", "black rectangle",
    "purple triangle", "gray triangle", "maroon triangle", "deeppink triangle", "saddlebrown oval", "magenta oval",
  ]
  pair = false;
  picked = [];
  matched = [];
  moves = 0;
  matches = 0;
}
