'use strict';

function Card(value, color, suit, img, container) {

  this.value = value;
  this.color = color;
  this.suit = suit;
  this.img = img;
  this.container = container;

}

Card.prototype.draw = function() {
  var self = this;

  self.container.innerHTML = '';
  //poner las img de cada carta
  var spanValue = document.createElement('span');
  spanValue.innerText = self.value + ' of ';
  var spanColor = document.createElement('span');
  spanColor.innerText = ' - ' + self.color;
  var spanSuit = document.createElement('span');
  spanSuit.innerText = self.suit;

  self.container.appendChild(spanValue);
  self.container.appendChild(spanSuit);
  self.container.appendChild(spanColor);

}