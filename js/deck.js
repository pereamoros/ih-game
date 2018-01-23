'use strict';

var CARDS = [
  { value: 'Ace', suit: 'diamonds', color: 'RED', img:'ace_of_diamonds.png'},
  { value: '2', suit: 'diamonds', color: 'RED', img:'2_of_diamonds.png'},
  { value: '3', suit: 'diamonds', color: 'RED', img:'3_of_diamonds.png'},
  { value: '4', suit: 'diamonds', color: 'RED', img:'4_of_diamonds.png'},
  { value: '5', suit: 'diamonds', color: 'RED', img:'5_of_diamonds.png'},
  { value: '6', suit: 'diamonds', color: 'RED', img:'6_of_diamonds.png'},
  { value: '7', suit: 'diamonds', color: 'RED', img:'7_of_diamonds.png'},
  { value: '8', suit: 'diamonds', color: 'RED', img:'8_of_diamonds.png'},
  { value: '9', suit: 'diamonds', color: 'RED', img:'9_of_diamonds.png'},
  { value: '10', suit: 'diamonds', color: 'RED', img:'10_of_diamonds.png'},
  { value: 'Jack', suit: 'diamonds', color: 'RED', img:'jack_of_diamonds.png'},
  { value: 'Queen', suit: 'diamonds', color: 'RED', img:'queen_of_diamonds.png'},
  { value: 'King', suit: 'diamonds', color: 'RED', img:'king_of_diamonds.png'},
  { value: 'Ace', suit: 'hearts', color: 'RED', img:'ace_of_hearts.png'},
  { value: '2', suit: 'hearts', color: 'RED', img:'2_of_hearts.png'},
  { value: '3', suit: 'hearts', color: 'RED', img:'3_of_hearts.png'},
  { value: '4', suit: 'hearts', color: 'RED', img:'4_of_hearts.png'},
  { value: '5', suit: 'hearts', color: 'RED', img:'5_of_hearts.png'},
  { value: '6', suit: 'hearts', color: 'RED', img:'6_of_hearts.png'},
  { value: '7', suit: 'hearts', color: 'RED', img:'7_of_hearts.png'},
  { value: '8', suit: 'hearts', color: 'RED', img:'8_of_hearts.png'},
  { value: '9', suit: 'hearts', color: 'RED', img:'9_of_hearts.png'},
  { value: '10', suit: 'hearts', color: 'RED', img:'10_of_hearts.png'},
  { value: 'Jack', suit: 'hearts', color: 'RED', img:'jack_of_hearts.png'},
  { value: 'Queen', suit: 'hearts', color: 'RED', img:'queen_of_hearts.png'},
  { value: 'King', suit: 'hearts', color: 'RED', img:'king_of_hearts.png'},
  { value: 'Ace', suit: 'spades', color: 'BLACK', img:'ace_of_spades.png'},
  { value: '2', suit: 'spades', color: 'BLACK', img:'2_of_spades.png'},
  { value: '3', suit: 'spades', color: 'BLACK', img:'3_of_spades.png'},
  { value: '4', suit: 'spades', color: 'BLACK', img:'4_of_spades.png'},
  { value: '5', suit: 'spades', color: 'BLACK', img:'5_of_spades.png'},
  { value: '6', suit: 'spades', color: 'BLACK', img:'6_of_spades.png'},
  { value: '7', suit: 'spades', color: 'BLACK', img:'7_of_spades.png'},
  { value: '8', suit: 'spades', color: 'BLACK', img:'8_of_spades.png'},
  { value: '9', suit: 'spades', color: 'BLACK', img:'9_of_spades.png'},
  { value: '10', suit: 'spades', color: 'BLACK', img:'10_of_spades.png'},
  { value: 'Jack', suit: 'spades', color: 'BLACK', img:'jack_of_spades.png'},
  { value: 'Queen', suit: 'spades', color: 'BLACK', img:'queen_of_spades.png'},
  { value: 'King', suit: 'spades', color: 'BLACK', img:'king_of_spades.png'},
  { value: 'Ace', suit: 'clubs', color: 'BLACK', img:'ace_of_clubs.png'},
  { value: '2', suit: 'clubs', color: 'BLACK', img:'2_of_clubs.png'},
  { value: '3', suit: 'clubs', color: 'BLACK', img:'3_of_clubs.png'},
  { value: '4', suit: 'clubs', color: 'BLACK', img:'4_of_clubs.png'},
  { value: '5', suit: 'clubs', color: 'BLACK', img:'5_of_clubs.png'},
  { value: '6', suit: 'clubs', color: 'BLACK', img:'6_of_clubs.png'},
  { value: '7', suit: 'clubs', color: 'BLACK', img:'7_of_clubs.png'},
  { value: '8', suit: 'clubs', color: 'BLACK', img:'8_of_clubs.png'},
  { value: '9', suit: 'clubs', color: 'BLACK', img:'9_of_clubs.png'},
  { value: '10', suit: 'clubs', color: 'BLACK', img:'10_of_clubs.png'},
  { value: 'Jack', suit: 'clubs', color: 'BLACK', img:'jack_of_clubs.png'},
  { value: 'Queen', suit: 'clubs', color: 'BLACK', img:'queen_of_clubs.png'},
  { value: 'King', suit: 'clubs', color: 'BLACK', img:'king_of_clubs.png'}
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
  var imgCardElement = document.querySelector('.big-deck');
  for (var i = 0; i < CARDS.length; i++) {
    var value = CARDS[i].value;
    var suit = CARDS[i].suit;
    var color = CARDS[i].color;
    var img = CARDS[i].img;
    var newCard = new Card(value, color, suit, img, containerElement, imgCardElement);

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