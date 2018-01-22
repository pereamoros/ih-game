'use strict';

function Game(mainElement) {
  
  this.mainElement = mainElement;
  this.buttonOptionOneElement;
  this.buttonOptionTwoElement;
  this.gameElement;
  this.onEnd;
  this.deck;
  this.currentChallenge;

  this.score = 10;

  console.log("Create the game");

  this.buildLayout();
  this.startGame();
}

Game.prototype._setupChallengeOne = function() {
  var self = this;
  self.buttonOptionOneElement.innerText = "Black"
  self.buttonOptionOneElement.addEventListener('click', self._firstChallengeLogic.bind(self));
  self.buttonOptionTwoElement.innerText = "Red"
  self.buttonOptionTwoElement.addEventListener('click', self._firstChallengeLogic.bind(self));

  self.deck.getNextCard();
}

Game.prototype._firstChallengeLogic = function(e) {
  var self = this;
  console.log(e.currentTarget.innerText);
  console.log(self.deck.currentCard);
  self.deck.drawCard();
  self._firstChallengeUpdate();
}

Game.prototype._firstChallengeUpdate = function() {
  var self = this;
  self.deck.getNextCard();
}

Game.prototype._createNextChallenge = function() {
  var self = this;
  switch(self.currentChallenge) {
    case 1:
      self._setupChallengeOne();
      break;
    default:
      console.log('Not implemented yet');
  }
}

Game.prototype.startGame = function() {
  var self = this;
  self.deck = new Deck(self.gameElement);
  self.currentChallenge = 1;
  self._createNextChallenge();
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
  self.buttonOptionOneElement = document.createElement('button');
  self.buttonOptionTwoElement = document.createElement('button');
  self.buttonOptionOneElement.classList.add('red-button');
  self.buttonOptionOneElement.innerText = 'red';
  self.buttonOptionTwoElement.classList.add('black-button');  
  self.buttonOptionTwoElement.innerText = 'black';
  gameBottomElement.appendChild(self.buttonOptionOneElement);
  gameBottomElement.appendChild(self.buttonOptionTwoElement);  

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
