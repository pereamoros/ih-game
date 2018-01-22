'use strict';

var CARDS = [
  { value: 'Ace', suit: 'diamonds', color: 'red', img:'' },
  { value: '2', suit: 'diamonds', color: 'red', img:'' },
  { value: '3', suit: 'diamonds', color: 'red', img:'' },
  { value: '4', suit: 'diamonds', color: 'red', img:'' },
  { value: '5', suit: 'diamonds', color: 'red', img:'' },
  { value: '6', suit: 'diamonds', color: 'red', img:'' },
  { value: '7', suit: 'diamonds', color: 'red', img:'' },
  { value: '8', suit: 'diamonds', color: 'red', img:'' },
  { value: '9', suit: 'diamonds', color: 'red', img:'' },
  { value: '10', suit: 'diamonds', color: 'red', img:'' },
  { value: 'Jack', suit: 'diamonds', color: 'red', img:'' },
  { value: 'Queen', suit: 'diamonds', color: 'red', img:'' },
  { value: 'King', suit: 'diamonds', color: 'red', img:'' },
  { value: 'Ace', suit: 'hearts', color: 'red', img:'' },
  { value: '2', suit: 'hearts', color: 'red', img:'' },
  { value: '3', suit: 'hearts', color: 'red', img:'' },
  { value: '4', suit: 'hearts', color: 'red', img:'' },
  { value: '5', suit: 'hearts', color: 'red', img:'' },
  { value: '6', suit: 'hearts', color: 'red', img:'' },
  { value: '7', suit: 'hearts', color: 'red', img:'' },
  { value: '8', suit: 'hearts', color: 'red', img:'' },
  { value: '9', suit: 'hearts', color: 'red', img:'' },
  { value: '10', suit: 'hearts', color: 'red', img:'' },
  { value: 'Jack', suit: 'hearts', color: 'red', img:'' },
  { value: 'Queen', suit: 'hearts', color: 'red', img:'' },
  { value: 'King', suit: 'hearts', color: 'red', img:'' },
  { value: 'Ace', suit: 'spades', color: 'black', img:'' },
  { value: '2', suit: 'spades', color: 'black', img:'' },
  { value: '3', suit: 'spades', color: 'black', img:'' },
  { value: '4', suit: 'spades', color: 'black', img:'' },
  { value: '5', suit: 'spades', color: 'black', img:'' },
  { value: '6', suit: 'spades', color: 'black', img:'' },
  { value: '7', suit: 'spades', color: 'black', img:'' },
  { value: '8', suit: 'spades', color: 'black', img:'' },
  { value: '9', suit: 'spades', color: 'black', img:'' },
  { value: '10', suit: 'spades', color: 'black', img:'' },
  { value: 'Jack', suit: 'spades', color: 'black', img:'' },
  { value: 'Queen', suit: 'spades', color: 'black', img:'' },
  { value: 'King', suit: 'spades', color: 'black', img:'' },
  { value: 'Ace', suit: 'clubs', color: 'black', img:'' },
  { value: '2', suit: 'clubs', color: 'black', img:'' },
  { value: '3', suit: 'clubs', color: 'black', img:'' },
  { value: '4', suit: 'clubs', color: 'black', img:'' },
  { value: '5', suit: 'clubs', color: 'black', img:'' },
  { value: '6', suit: 'clubs', color: 'black', img:'' },
  { value: '7', suit: 'clubs', color: 'black', img:'' },
  { value: '8', suit: 'clubs', color: 'black', img:'' },
  { value: '9', suit: 'clubs', color: 'black', img:'' },
  { value: '10', suit: 'clubs', color: 'black', img:'' },
  { value: 'Jack', suit: 'clubs', color: 'black', img:'' },
  { value: 'Queen', suit: 'clubs', color: 'black', img:'' },
  { value: 'King', suit: 'clubs', color: 'black', img:'' }
];

function Deck(gameElement) {

  this.gameElement = gameElement;
  this.cardsFlipped;
  this.cards;
  this.cardsRemaining;
  this.currentCard;
  this.init();
}

Deck.prototype.init = function() {
  var self = this;

  self.cards = [];
  self.cardsFlipped = [];
  self._createCards();
  self._shuffleCards();
  self.cardsRemaining = self.cards.length;

}

Deck.prototype.drawCard = function() {
  var self = this;
  self.currentCard.draw();
}

Deck.prototype.getNextCard = function(){
  var self = this;

  self.currentCard = self.cards.shift();
  self.cardsFlipped.push(self.currentCard);

}

Deck.prototype._createCards = function() {
  var self = this;
  var containerElement = document.querySelector('.current-card');

  for (var i = 0; i < CARDS.length; i++) {
    var value = CARDS[i].value;
    var suit = CARDS[i].suit;
    var color = CARDS[i].color;
    var img = CARDS[i].img;
    var newCard = new Card(value, color, suit, img, containerElement);

    self.cards.push(newCard);
  }
} 

Deck.prototype._shuffleCards = function () {
  var self = this;

  var m = self.cards.length
  var t; 
  var i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = self.cards[m];
    self.cards[m] = self.cards[i];
    self.cards[i] = t;
  }
};