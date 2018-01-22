'use strict';

function Game(mainElement) {
  
  this.mainElement = mainElement;
  this.gameElement;
  this.onEnd;

  this.score = 10;

  console.log("Create the game");

  this.buildLayout();
  this.firstStep();
}

Game.prototype.firstStep = function() {
  var self = this;

  var deck = new Deck();
  // Set which player is playing (for now always nº1)

  // Deck shows and display it's length

  var deckLength = deck.cards.length;
  var deckLengthInput = document.querySelector('#remaining-cards');
  deckLengthInput.innerText = deckLength;

  // Random card in col Main Element
  
  var shufledDeck = deck.shuffleCard(deck.cards);
  
  
  for (var i = 0; i < shufledDeck.length; i++){
    var cardToTurn = document.querySelector('.big-deck');
    cardToTurn.addEventListener('click', function(){
      console.log(shufledDeck[1]);
      // shufledDeck.splice(shufledDeck[i]);
      // console.log(shufledDeck.length);
    })
  }
  
  // Click either red or black to know its color value

  // Update score if player got it right

  // Set the picked Card in the right column
}

Game.prototype.buildLayout = function() {
  //-------- CREATING DOM --------
  // Top Element DOM
  var self = this;
  self.gameElement = document.createElement('div');
  var gameTopElement = document.createElement('div');
  gameTopElement.classList.add('game-top');
  var colLeftElement = document.createElement('div');
  colLeftElement.classList.add('left-col');
  var colMainElement = document.createElement('div');
  colMainElement.classList.add('main-col');
  var colRightElement = document.createElement('div');
  colRightElement.classList.add('right-col');
  gameTopElement.appendChild(colLeftElement);
  gameTopElement.appendChild(colMainElement);
  gameTopElement.appendChild(colRightElement);
  self.gameElement.appendChild(gameTopElement);

  // Left Column
  //    Deck thumbnail DOM
  var cardDeck = document.createElement('div');
  cardDeck.classList.add('card-deck');
  var imgDeckReverse = document.createElement('img');
  imgDeckReverse.setAttribute('src', './img/back-card.png');
  imgDeckReverse.classList.add('small-deck');
  cardDeck.appendChild(imgDeckReverse);
  var deckLengthElement = document.createElement('div');
  deckLengthElement.classList.add('deck-length');
  var remainingCardsElement = document.createElement('span');
  remainingCardsElement.setAttribute('id','remaining-cards');
  var allCardsElement = document.createElement('span');
  allCardsElement.innerText = ' / 52';
  deckLengthElement.appendChild(remainingCardsElement);
  deckLengthElement.appendChild(allCardsElement);
  cardDeck.appendChild(deckLengthElement);
  colLeftElement.appendChild(cardDeck);
  //    Score DOM
  var scoreElement = document.createElement('div');
  scoreElement.classList.add('player-score');
  var scoreText = document.createElement('span');
  scoreText.innerText = 'SCORE: ';
  var currentScore = document.createElement('span');
  currentScore.setAttribute('id','current-score');
  scoreElement.appendChild(scoreText);
  scoreElement.appendChild(currentScore);
  colLeftElement.appendChild(scoreElement);

  //Main Column
  var currentPlayerElement = document.createElement('div');
  var currentPlayerTitle = document.createElement('h1');
  currentPlayerTitle.classList.add('player-name');
  currentPlayerTitle.innerText = 'Player 1';
  currentPlayerElement.appendChild(currentPlayerTitle);
  colMainElement.appendChild(currentPlayerElement);

  var currentCardPlayedElement = document.createElement('div');
  currentCardPlayedElement.classList.add('current-card');

  var imgCardReverse = document.createElement('img');
  imgCardReverse.setAttribute('src', './img/back-card.png');
  imgCardReverse.classList.add('big-deck');
  currentCardPlayedElement.appendChild(imgCardReverse);

  colMainElement.appendChild(currentCardPlayedElement);

  //Bottom Element
  var gameBottomElement = document.createElement('div');
  gameBottomElement.classList.add('game-bottom');

  // First Buttons - a) red or black
  var firstButton = document.createElement('button');
  var secondButton = document.createElement('button');
  firstButton.innerText = 'red';
  secondButton.innerText = 'black';
  gameBottomElement.appendChild(firstButton);
  gameBottomElement.appendChild(secondButton);  

  //append to Main Element
  self.gameElement.appendChild(gameBottomElement);
  self.mainElement.appendChild(self.gameElement);
  
}

Game.prototype.checkPoints = function() {

  //----
  console.log('Checking points');
  this.onEnd(this.score);

}

Game.prototype.destroy = function () {
  var self = this;
  console.log("Exits the game");
  self.gameElement.remove();
};
