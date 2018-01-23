'use strict';

function Game(mainElement) {  
  var self = this;

  self.mainElement = mainElement;
  self.message;
  self.nextChallengeButton;
  self.buttonOptionOneElement;
  self.buttonOptionTwoElement;
  self.gameElement;
  self.onEnd;
  self.deck;
  self.currentChallenge;
  self.score;
  self.currentScore;
  self.remainingCardsElement;
  self.flippedCardOne;
  self.flippedCardTwo;
  self.flippedCardThree;
  self.flippedCardFour;

  self._challengeLogic = function(e) {
    switch(self.currentChallenge) {
      case 1:
        if(e.currentTarget.innerText === self.deck.currentCard.color){
          self.message.innerText = "CORRECT! You can send a drink of beer. +1 point";
          self.score += 1;
        }
        else{
          self.message.innerText = "WRONG! You have a drink of beer. -1 point";
          self.score -= 1;
        }
        self.buttonOptionOneElement.setAttribute('disabled','true');
        self.buttonOptionTwoElement.setAttribute('disabled','true');
        self.deck.drawCard();
        self._updateScoreElement();
        self._updateDeckLength();
        self.nextChallengeButton.removeAttribute('disabled');
        self.nextChallengeButton.addEventListener('click', self._challengeUpdate);
      break;
      case 2:
        //console.log(e.currentTarget.innerText);
        //   console.log(self.deck.currentCard);
        //   self.deck.drawCard();
        //   self._firstChallengeUpdate();
      break;
      case 3:
      //console.log(e.currentTarget.innerText);
      //   console.log(self.deck.currentCard);
      //   self.deck.drawCard();
      //   self._firstChallengeUpdate();
      break;
      default:
        console.log('Not implemented yet');
    }
    
  }

  self._challengeUpdate = function() {
    switch(self.currentChallenge) {
      case 1:
        self._resetLayout();
        //to create it
        //self._showFlippedCard();
        self.flippedCardOne.setAttribute('style', 'background: url(./img/' + self.deck.cardsFlipped[0].img +'); background-size:cover;');
        // self.flippedCardOne.style.backgroundSize = 'background-size: cover';
        // self.deck.getNextCard();
        self.currentChallenge = 2;
        self._createNextChallenge();
      break;
      case 2:
      //   self.deck.getNextCard();
      //   self.currentChallenge = 3;
      //   self._createNextChallenge();
      break;
      case 3:
      //   self.deck.getNextCard();
      //   self.currentChallenge = 3;
      //   self._createNextChallenge();
      break;
      default:
        console.log('Not implemented yet');
    }
    
  }

  self.buildLayout();
  self.startGame();
}

/* -- FIRST CHALLENGE -- */
Game.prototype._setupChallengeOne = function() {
  var self = this;
  self.message.innerText = "Guess the color of the next card.";
  self.buttonOptionOneElement.innerText = "Black";
  self.buttonOptionOneElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.innerText = "Red";
  self.buttonOptionTwoElement.addEventListener('click', self._challengeLogic);
  self.deck.getNextCard();
}

/* -- SECOND CHALLENGE -- */
Game.prototype._setupChallengeTwo = function() {
  var self = this;
  //remove key events challenge 1
  self.buttonOptionOneElement.removeEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.removeEventListener('click', self._challengeLogic);
  //---- 
  self.buttonOptionOneElement.removeAttribute('disabled');
  self.buttonOptionTwoElement.removeAttribute('disabled');
  self.nextChallengeButton.setAttribute('disabled','true');
  self.buttonOptionOneElement.innerText = "Higher"
  self.buttonOptionOneElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.innerText = "Lower"
  self.buttonOptionTwoElement.addEventListener('click', self._challengeLogic);

  self.deck.getNextCard();
}
/* -- THIRD CHALLENGE -- */
Game.prototype._setupChallengeThree = function() {
  var self = this;
  //remove key events challenge 1
  self.buttonOptionOneElement.removeEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.removeEventListener('click', self._challengeLogic);
  //---- 
  self.buttonOptionOneElement.innerText = "In between"
  self.buttonOptionOneElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.innerText = "Outside"
  self.buttonOptionTwoElement.addEventListener('click', self._challengeLogic);

  self.deck.getNextCard();
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
  self.remainingCardsElement = document.createElement('span');
  self.remainingCardsElement.setAttribute('id','remaining-cards');
  var allCardsElement = document.createElement('span');
  allCardsElement.innerText = ' / 52';
  self.remainingCardsElement.innerText = '52';
  deckLengthElement.appendChild(self.remainingCardsElement);
  deckLengthElement.appendChild(allCardsElement);
  cardDeck.appendChild(deckLengthElement);
  colLeftElement.appendChild(cardDeck);

  //    Score DOM
  var scoreElement = document.createElement('div');
  scoreElement.classList.add('player-score');
  var scoreText = document.createElement('span');
  scoreText.innerText = 'SCORE: ';
  self.currentScore = document.createElement('span');
  self.currentScore.setAttribute('id','current-score');
  self.currentScore.innerText = '0';
  scoreElement.appendChild(scoreText);
  scoreElement.appendChild(self.currentScore);
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

  // --- RIGHT COLUMN
  var flippedCardsElement = document.createElement('div');
  flippedCardsElement.classList.add('flipped-cards-container');
  self.flippedCardOne = document.createElement('div');
  self.flippedCardOne.classList.add('flipped-cards-item');
  self.flippedCardOne.setAttribute('id','flipped-card-1');
  self.flippedCardTwo = document.createElement('div');
  self.flippedCardTwo.classList.add('flipped-cards-item');
  self.flippedCardTwo.setAttribute('id','flipped-card-1');
  self.flippedCardThree = document.createElement('div');
  self.flippedCardThree.classList.add('flipped-cards-item');
  self.flippedCardThree.setAttribute('id','flipped-card-1');
  self.flippedCardFour = document.createElement('div');
  self.flippedCardFour.classList.add('flipped-cards-item');
  self.flippedCardFour.setAttribute('id','flipped-card-1');
  flippedCardsElement.appendChild(self.flippedCardOne);
  flippedCardsElement.appendChild(self.flippedCardTwo);
  flippedCardsElement.appendChild(self.flippedCardThree);
  flippedCardsElement.appendChild(self.flippedCardFour);
  colRightElement.appendChild(flippedCardsElement);
  //append to Main Element
  self.gameElement.appendChild(gameBottomElement);
  self.mainElement.appendChild(self.gameElement);
  
}

Game.prototype.checkPoints = function() {
  var self = this;

  console.log('Checking points');
  self.onEnd(self.score);

}

Game.prototype.destroy = function () {
  var self = this;
  console.log("Exits the game");
  self.gameElement.remove();
};

Game.prototype._resetLayout = function() {
  var self = this;
  var imgCardElement = document.querySelector('.big-deck');
  imgCardElement.setAttribute('src', './img/back-card.png');
}

Game.prototype._updateScoreElement = function(){
  var self = this;
  self.currentScore.innerText = self.score;
}

Game.prototype._updateDeckLength = function(){
  var self = this;
  self.remainingCardsElement.innerText = self.deck.cards.length;
}