'use strict';

function Deck() {
  
  this.cards = [
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
}

Deck.prototype.shuffleCard = function (cardsArr) {
  var m = cardsArr.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = cardsArr[m];
    cardsArr[m] = cardsArr[i];
    cardsArr[i] = t;
  }

  return cardsArr;
};