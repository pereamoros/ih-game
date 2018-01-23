'use strict';

function Game(mainElement) {
  
  this.mainElement = mainElement;
  this.message;
  this.nextChallengeButton;
  this.buttonOptionOneElement;
  this.buttonOptionTwoElement;
  this.gameElement;
  this.onEnd;
  this.deck;
  this.currentChallenge;
  this.score;

  console.log("Create the game");

  this.buildLayout();
  this.startGame();
}

Game.prototype._setupChallengeOne = function() {
  var self = this;
  self.message.innerText = "What color would be the next car?";
  self.buttonOptionOneElement.innerText = "Black";
  self.buttonOptionOneElement.addEventListener('click', self._firstChallengeLogic.bind(self));
  self.buttonOptionTwoElement.innerText = "Red";
  self.buttonOptionTwoElement.addEventListener('click', self._firstChallengeLogic.bind(self));
  self.deck.getNextCard();
}

Game.prototype._firstChallengeLogic = function(e) {
  var self = this;
  if(e.currentTarget.innerText === self.deck.currentCard.color){
    self.message.innerText = "CORRECT! You can send a drink of beer. +1 point";
    self.score += 1;
  }
  else{
    self.message.innerText = "WRONG! You have a drink of beer. -1 point";
    self.score -= 1;
  }
  self.deck.drawCard();
  //to create it
  //self._updateScoreElement();
  self.nextChallengeButton.removeAttribute('disabled');
  self.nextChallengeButton.addEventListener('click', self._firstChallengeUpdate.bind(self));
}

Game.prototype._firstChallengeUpdate = function() {
  var self = this;
  self.buttonOptionOneElement.removeEventListener('click', self._firstChallengeLogic);
  self.buttonOptionTwoElement.removeEventListener('click', self._firstChallengeLogic);
  self._resetLayout();
  //to create it
  //self._showFlippedCard();
  self.deck.getNextCard();
  self.currentChallenge = 2;
  self._createNextChallenge();
}

Game.prototype._resetLayout = function() {
  var self = this;
  var imgCardElement = document.querySelector('.big-deck');
  imgCardElement.setAttribute('src', './img/back-card.png');
  // var containerElement = document.querySelector('.current-card');
  // containerElement.innerText = '';
}

Game.prototype._setupChallengeTwo = function() {
  var self = this;
  self.buttonOptionOneElement.innerText = "Higher"
  self.buttonOptionOneElement.addEventListener('click', self._secondChallengeLogic.bind(self));
  self.buttonOptionTwoElement.innerText = "Lower"
  self.buttonOptionTwoElement.addEventListener('click', self._secondChallengeLogic.bind(self));

  self.deck.getNextCard();
}
Game.prototype._secondChallengeLogic = function(e) {
  var self = this;
  console.log(e.currentTarget.innerText);
  console.log(self.deck.currentCard);
  self.deck.drawCard();
  self._firstChallengeUpdate();
}
Game.prototype._secondChallengeUpdate = function() {
  var self = this;
  self.deck.getNextCard();
  self.currentChallenge = 3;
  self._createNextChallenge();
}

Game.prototype._setupChallengeThree = function() {
  var self = this;
  self.buttonOptionOneElement.innerText = "In between"
  self.buttonOptionOneElement.addEventListener('click', self._secondChallengeLogic.bind(self));
  self.buttonOptionTwoElement.innerText = "Outside"
  self.buttonOptionTwoElement.addEventListener('click', self._secondChallengeLogic.bind(self));

  self.deck.getNextCard();
}
Game.prototype._thirdChallengeLogic = function(e) {
  var self = this;
  console.log(e.currentTarget.innerText);
  console.log(self.deck.currentCard);
  self.deck.drawCard();
  self._firstChallengeUpdate();
}
Game.prototype._thirdChallengeUpdate = function() {
  var self = this;
  self.deck.getNextCard();
  self.currentChallenge = 3;
  self._createNextChallenge();
}

Game.prototype._createNextChallenge = function() {
  var self = this;
  switch(self.currentChallenge) {
    case 1:
      self._setupChallengeOne();
    break;
    case 2:
      self._setupChallengeTwo();
    break;
    case 3:
      self._setupChallengeThree();
    break;
    default:
      console.log('Not implemented yet');
  }
}

Game.prototype.startGame = function() {
  var self = this;
  self.deck = new Deck(self.gameElement);
  self.score = 0;
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
  var buttonsElement = document.createElement('div');
  buttonsElement.classList.add('buttons-container');
  var messageElement = document.createElement('div');
  messageElement.classList.add('message-container');
  self.message = document.createElement('span');
  self.message.classList.add('message');
  self.nextChallengeButton = document.createElement('button');
  self.nextChallengeButton.setAttribute('disabled', 'true');
  self.nextChallengeButton.classList.add('button-next');
  self.nextChallengeButton.innerText = 'NEXT';
  messageElement.appendChild(self.message);
  messageElement.appendChild(self.nextChallengeButton);
  gameBottomElement.appendChild(messageElement);
  gameBottomElement.appendChild(buttonsElement); 

  // First Buttons - a) red or black
  self.buttonOptionOneElement = document.createElement('button');
  self.buttonOptionTwoElement = document.createElement('button');
  self.buttonOptionOneElement.classList.add('button-one');
  self.buttonOptionTwoElement.classList.add('button-two');
  buttonsElement.appendChild(self.buttonOptionOneElement);
  buttonsElement.appendChild(self.buttonOptionTwoElement);

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
