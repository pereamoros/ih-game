'use strict';

var CARDS = [
  { value: 14, suit: 'DIAMONDS', color: 'RED', img:'ace_of_diamonds.png'},
  { value: 2, suit: 'DIAMONDS', color: 'RED', img:'2_of_diamonds.png'},
  { value: 3, suit: 'DIAMONDS', color: 'RED', img:'3_of_diamonds.png'},
  { value: 4, suit: 'DIAMONDS', color: 'RED', img:'4_of_diamonds.png'},
  { value: 5, suit: 'DIAMONDS', color: 'RED', img:'5_of_diamonds.png'},
  { value: 6, suit: 'DIAMONDS', color: 'RED', img:'6_of_diamonds.png'},
  { value: 7, suit: 'DIAMONDS', color: 'RED', img:'7_of_diamonds.png'},
  { value: 8, suit: 'DIAMONDS', color: 'RED', img:'8_of_diamonds.png'},
  { value: 9, suit: 'DIAMONDS', color: 'RED', img:'9_of_diamonds.png'},
  { value: 10, suit: 'DIAMONDS', color: 'RED', img:'10_of_diamonds.png'},
  { value: 11, suit: 'DIAMONDS', color: 'RED', img:'jack_of_diamonds.png'},
  { value: 12, suit: 'DIAMONDS', color: 'RED', img:'queen_of_diamonds.png'},
  { value: 13, suit: 'DIAMONDS', color: 'RED', img:'king_of_diamonds.png'},
  { value: 14, suit: 'HEARTS', color: 'RED', img:'ace_of_hearts.png'},
  { value: 2, suit: 'HEARTS', color: 'RED', img:'2_of_hearts.png'},
  { value: 3, suit: 'HEARTS', color: 'RED', img:'3_of_hearts.png'},
  { value: 4, suit: 'HEARTS', color: 'RED', img:'4_of_hearts.png'},
  { value: 5, suit: 'HEARTS', color: 'RED', img:'5_of_hearts.png'},
  { value: 6, suit: 'HEARTS', color: 'RED', img:'6_of_hearts.png'},
  { value: 7, suit: 'HEARTS', color: 'RED', img:'7_of_hearts.png'},
  { value: 8, suit: 'HEARTS', color: 'RED', img:'8_of_hearts.png'},
  { value: 9, suit: 'HEARTS', color: 'RED', img:'9_of_hearts.png'},
  { value: 10, suit: 'HEARTS', color: 'RED', img:'10_of_hearts.png'},
  { value: 11, suit: 'HEARTS', color: 'RED', img:'jack_of_hearts.png'},
  { value: 12, suit: 'HEARTS', color: 'RED', img:'queen_of_hearts.png'},
  { value: 13, suit: 'HEARTS', color: 'RED', img:'king_of_hearts.png'},
  { value: 14, suit: 'SPADES', color: 'BLACK', img:'ace_of_spades.png'},
  { value: 2, suit: 'SPADES', color: 'BLACK', img:'2_of_spades.png'},
  { value: 3, suit: 'SPADES', color: 'BLACK', img:'3_of_spades.png'},
  { value: 4, suit: 'SPADES', color: 'BLACK', img:'4_of_spades.png'},
  { value: 5, suit: 'SPADES', color: 'BLACK', img:'5_of_spades.png'},
  { value: 6, suit: 'SPADES', color: 'BLACK', img:'6_of_spades.png'},
  { value: 7, suit: 'SPADES', color: 'BLACK', img:'7_of_spades.png'},
  { value: 8, suit: 'SPADES', color: 'BLACK', img:'8_of_spades.png'},
  { value: 9, suit: 'SPADES', color: 'BLACK', img:'9_of_spades.png'},
  { value: 10, suit: 'SPADES', color: 'BLACK', img:'10_of_spades.png'},
  { value: 11, suit: 'SPADES', color: 'BLACK', img:'jack_of_spades.png'},
  { value: 12, suit: 'SPADES', color: 'BLACK', img:'queen_of_spades.png'},
  { value: 13, suit: 'SPADES', color: 'BLACK', img:'king_of_spades.png'},
  { value: 14, suit: 'CLUBS', color: 'BLACK', img:'ace_of_clubs.png'},
  { value: 2, suit: 'CLUBS', color: 'BLACK', img:'2_of_clubs.png'},
  { value: 3, suit: 'CLUBS', color: 'BLACK', img:'3_of_clubs.png'},
  { value: 4, suit: 'CLUBS', color: 'BLACK', img:'4_of_clubs.png'},
  { value: 5, suit: 'CLUBS', color: 'BLACK', img:'5_of_clubs.png'},
  { value: 6, suit: 'CLUBS', color: 'BLACK', img:'6_of_clubs.png'},
  { value: 7, suit: 'CLUBS', color: 'BLACK', img:'7_of_clubs.png'},
  { value: 8, suit: 'CLUBS', color: 'BLACK', img:'8_of_clubs.png'},
  { value: 9, suit: 'CLUBS', color: 'BLACK', img:'9_of_clubs.png'},
  { value: 10, suit: 'CLUBS', color: 'BLACK', img:'10_of_clubs.png'},
  { value: 11, suit: 'CLUBS', color: 'BLACK', img:'jack_of_clubs.png'},
  { value: 12, suit: 'CLUBS', color: 'BLACK', img:'queen_of_clubs.png'},
  { value: 13, suit: 'CLUBS', color: 'BLACK', img:'king_of_clubs.png'}
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