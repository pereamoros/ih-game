'use strict';

function Game(mainElement) {  
  var self = this;

  self.mainElement = mainElement;
  self.message;
  self.nextChallengeButton;
  self.buttonOptionOneElement;
  self.buttonOptionTwoElement;
  self.buttonOptionThreeElement;
  self.buttonOptionFourElement;
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
  self.rulesText;

  self.playerOne;
  self.players;

  self._challengeLogic = function(e) {
    switch(self.currentChallenge) {
      case 1:
        if(e.currentTarget.innerText === self.deck.currentCard.color){
          self.message.innerText = "CORRECT it's the same color! You can pick a player to drink. +1 point";
          self.score += 1;
        }
        else{
          self.message.innerText = "WRONG color! You have to take a drink. -1 point";
          self.score -= 1;
        }
        self._challengeLogic2();
      break;
      case 2:
        if(e.currentTarget.innerText === "HIGHER" && self.deck.cardsFlipped[0].value <= self.deck.currentCard.value){
          self.message.innerText = "CORRECT ! You can pick a player to drink. +1 point";
          self.score += 1;
        }
        else if(e.currentTarget.innerText === "LOWER" && self.deck.cardsFlipped[0].value > self.deck.currentCard.value){
          self.message.innerText = "CORRECT ! You can pick a player to drink. +1 point";
          self.score += 1;
        }
        else{
          self.message.innerText = "WRONG! You have to take a drink. -1 point";
          self.score -= 1;
        }
        self._challengeLogic2();
      break;
      case 3:
        if(self.deck.cardsFlipped[0].value > self.deck.cardsFlipped[1].value){

          if(e.currentTarget.innerText === "IN BETWEEN" && (self.deck.currentCard.value <= self.deck.cardsFlipped[0].value && self.deck.currentCard.value >= self.deck.cardsFlipped[1].value)){
            self.message.innerText = "The card is in between! You can pick a player to drink. +1 point";
            self.score += 1;
          }
          else if(e.currentTarget.innerText === "OUTSIDE OF" && (self.deck.currentCard.value > self.deck.cardsFlipped[0].value || self.deck.currentCard.value < self.deck.cardsFlipped[1].value)){
            self.message.innerText = "The card is outside of the previous two! You can pick a player to drink. +1 point";
            self.score += 1;
          }
          else{
            self.message.innerText = "WRONG! You have to take a drink. -1 point";
            self.score -= 1;
          }

        }
        else if(self.deck.cardsFlipped[0].value < self.deck.cardsFlipped[1].value){

          if(e.currentTarget.innerText === "IN BETWEEN" && (self.deck.currentCard.value <= self.deck.cardsFlipped[1].value && self.deck.currentCard.value > self.deck.cardsFlipped[0].value)){
            self.message.innerText = "The card is in between! You can pick a player to drink. +1 point";
            self.score += 1;
          }
          else if(e.currentTarget.innerText === "OUTSIDE OF" && (self.deck.currentCard.value > self.deck.cardsFlipped[1].value || self.deck.currentCard.value <= self.deck.cardsFlipped[0].value)){
            self.message.innerText = "The card is outside of the previous two! You can pick a player to drink. +1 point";
            self.score += 1;
          }
          else{
            self.message.innerText = "WRONG! You have to take a drink. -1 point";
            self.score -= 1;
          }

        }
        self._challengeLogic2();
      break;
      case 4:
        if(e.currentTarget.innerText === self.deck.currentCard.suit){
          self.message.innerText = "GREAT! You can pick a player to drink. +1 point";
          self.score += 1;
        }
        else{
          self.message.innerText = "WRONG! You have to take a drink. -1 point";
          self.score -= 1;
        }
        self._challengeLogic2();
      break;
      default:
        console.log('Not implemented yet');
    }
    
  }

  self._challengeUpdate = function() {
    switch(self.currentChallenge) {
      case 1:
        self._challengeUpdateFunction(self.flippedCardOne, self.deck.cardsFlipped[0].img, 2);
      break;
      case 2:
        self._challengeUpdateFunction(self.flippedCardTwo, self.deck.cardsFlipped[1].img, 3);
      break;
      case 3:
        self._challengeUpdateFunction(self.flippedCardThree, self.deck.cardsFlipped[2].img, 4);
      break;
      case 4:
        self._lastChallengeUpdate(self.flippedCardFour, self.deck.cardsFlipped[3].img);
      break;
      default:
        console.log('Not implemented yet');
    }
  }

  self.buildLayout();
  self.startGame();
}

Game.prototype.startGame = function() {
  var self = this;
  self.deck = new Deck(self.gameElement);
  self.score = 0;
  self.currentChallenge = 1;
  self._createNextChallenge();
}
//---GAME FUNCTIONALITY---
Game.prototype._createNextChallenge = function() {
  var self = this;
  switch(self.currentChallenge) {
    case 1:
      self._setupChallenge("Guess the color of the next card.", "Black", "Red", "Red &rarr; Diamonds & Hearts<br>Black &rarr; Spades & Clubs");
    break;
    case 2:
      self._setupChallenge("Will the next card be higher or lower?", "Higher", "Lower", "If it's the same value as the previous one it counts as a higher card!<br>* The highest card is the ACE!");
    break;
    case 3:
      self._setupChallenge("Will the next card be in between the previous two or outside of?", "In Between","Outside of", "If it's the same value as some of the previous two it counts as in between!");
    break;
    case 4:
      self._setupChallengeFourButtons("Guess the suit of the next card.", "Diamonds","Clubs","Hearts","Spades", "If you do a perfect round (Score = 4) everybody drinks!!");
    break;
    default:
      console.log('Not implemented yet');
  }
}
Game.prototype._setupChallenge = function(messageText, buttonOneText, buttonTwoText, rulesMessage) {
  var self = this;
  self.buttonOptionOneElement.removeEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.removeEventListener('click', self._challengeLogic);
  self.buttonOptionOneElement.removeAttribute('disabled');
  self.buttonOptionTwoElement.removeAttribute('disabled');
  self.nextChallengeButton.setAttribute('disabled','true');
  self.message.innerText = messageText;
  self.buttonOptionOneElement.innerText = buttonOneText;
  self.buttonOptionOneElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.innerText = buttonTwoText;
  self.buttonOptionTwoElement.addEventListener('click', self._challengeLogic);
  self.rulesText.innerHTML = rulesMessage;
  self.deck.getNextCard();
}
Game.prototype._challengeUpdateFunction = function(currentCardFlippedElement, cardFlippedImg, nextChallenge) {
  var self = this;
  self._resetLayout();
  self.nextChallengeButton.removeEventListener('click', self._challengeUpdate);
  currentCardFlippedElement.setAttribute('style', 'background: url(./img/' + cardFlippedImg +'); background-size:cover;');
  self.currentChallenge = nextChallenge;
  self._createNextChallenge();
}
Game.prototype._challengeLogic2 = function() {
  var self = this;
  self.buttonOptionOneElement.setAttribute('disabled','true');
  self.buttonOptionTwoElement.setAttribute('disabled','true');
  self.deck.drawCard();
  self._updateScoreElement();
  self._updateDeckLength();
  self.nextChallengeButton.removeAttribute('disabled');
  self.nextChallengeButton.addEventListener('click', self._challengeUpdate);
}
Game.prototype._resetLayout = function() {
  var self = this;
  var imgCardElement = document.querySelector('.big-deck');
  imgCardElement.setAttribute('src', './img/poison-back-card.png');
}
Game.prototype._updateScoreElement = function(){
  var self = this;
  self.currentScore.innerText = self.score;
}
Game.prototype._updateDeckLength = function(){
  var self = this;
  self.remainingCardsElement.innerText = self.deck.cards.length;
}
//--------LAST CHALLENGE DIFFERENT FUNCTIONS---
Game.prototype._setupChallengeFourButtons = function(messageText, buttonOneText, buttonTwoText, buttonThreeText, buttonFourText, rulesText) {
  var self = this;
  self.buttonOptionOneElement.removeEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.removeEventListener('click', self._challengeLogic);
  self.buttonOptionThreeElement.setAttribute('style','display:inline-block');
  self.buttonOptionFourElement.setAttribute('style','display:inline-block');
  self.buttonOptionOneElement.removeAttribute('disabled');
  self.buttonOptionTwoElement.removeAttribute('disabled');
  self.nextChallengeButton.setAttribute('disabled','true');
  self.message.innerText = messageText;
  self.buttonOptionOneElement.innerText = buttonOneText;
  self.buttonOptionOneElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionTwoElement.innerText = buttonTwoText;
  self.buttonOptionTwoElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionThreeElement.innerText = buttonThreeText;
  self.buttonOptionThreeElement.addEventListener('click', self._challengeLogic);
  self.buttonOptionFourElement.innerText = buttonFourText;
  self.buttonOptionFourElement.addEventListener('click', self._challengeLogic);
  self.rulesText.innerHTML = rulesText;
  self.deck.getNextCard();
}
Game.prototype._lastChallengeUpdate = function(currentCardFlippedElement, cardFlippedImg) {
  var self = this;
  self._resetLayout();
  self.nextChallengeButton.removeEventListener('click', self._challengeUpdate);
  currentCardFlippedElement.setAttribute('style', 'background: url(./img/' + cardFlippedImg +'); background-size:cover;');
  window.setTimeout(function(){
    self.checkPoints();
  }, 5000)
}
//---END GAME---
Game.prototype.checkPoints = function() {
  var self = this;
  self.onEnd(self.score);

}
Game.prototype.destroy = function () {
  var self = this;
  self.gameElement.remove();
};
//---DOM CREATION---
Game.prototype.buildLayout = function() {
  //-------- CREATING DOM --------
  // Top Element DOM
  var self = this;

  self.gameElement = document.createElement('div');
  self.gameElement.classList.add('game-element');
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
  imgDeckReverse.setAttribute('src', './img/poison-back-card.png');
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
  colMainElement.appendChild(currentPlayerElement);
  var currentCardPlayedElement = document.createElement('div');
  currentCardPlayedElement.classList.add('current-card');
  var imgCardReverse = document.createElement('img');
  imgCardReverse.setAttribute('src', './img/poison-back-card.png');
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

  // Option Buttons
  self.buttonOptionOneElement = document.createElement('button');
  self.buttonOptionTwoElement = document.createElement('button');
  self.buttonOptionThreeElement = document.createElement('button');
  self.buttonOptionFourElement = document.createElement('button');
  self.buttonOptionOneElement.classList.add('button-one');
  self.buttonOptionTwoElement.classList.add('button-two');
  self.buttonOptionThreeElement.classList.add('button-three');
  self.buttonOptionFourElement.classList.add('button-four');
  buttonsElement.appendChild(self.buttonOptionOneElement);
  buttonsElement.appendChild(self.buttonOptionTwoElement);
  buttonsElement.appendChild(self.buttonOptionThreeElement);
  buttonsElement.appendChild(self.buttonOptionFourElement);
  self.gameElement.appendChild(gameBottomElement);

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

  // ---- RULES -----
  var rulesElement = document.createElement('div');
  rulesElement.classList.add('rules-element', 'message-container');
  var rulesTitle = document.createElement('h2');
  rulesTitle.innerText = "GAME RULES";
  rulesElement.appendChild(rulesTitle);
  // var rulesFirstIterationOne = document.createElement('p');
  // rulesFirstIterationOne.textContent = "RED = Diamonds & Hearts";
  self.rulesText = document.createElement('p');
  self.rulesText.classList.add('rules-text');
  // rulesFirstIterationTwo.innerText = "BLACK = Spades & Clubs";
  rulesElement.appendChild(self.rulesText);
  // rulesElement.appendChild(rulesFirstIterationTwo);

  // var rulesSecondIteration = document.createElement('p');
  // rulesSecondIteration.textContent = "If it's the same value as the previous one it counts as a higher card!";
  // rulesElement.appendChild(rulesSecondIteration);

  // var rulesThirdIteration = document.createElement('p');
  // rulesThirdIteration.textContent = "If it's the same value as some of the previous two it counts as in between!";
  // rulesElement.appendChild(rulesThirdIteration);

  // var rulesThirdIteration = document.createElement('p');
  // rulesThirdIteration.textContent = "* The highest card is the ACE!";
  // rulesElement.appendChild(rulesThirdIteration);
  

  self.gameElement.appendChild(rulesElement);

  //append to Main Element
  
  self.mainElement.appendChild(self.gameElement);
  
}