'use strict';

function Game(ctx, width, height) {
  var self = this;

  var cards = [
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' },
    { name: 'greenlantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    { name: 'spiderman',       img: 'spiderman.jpg' },
    { name: 'superman',        img: 'superman.jpg' },
    { name: 'the-avengers',    img: 'the-avengers.jpg' },
    { name: 'thor',            img: 'thor.jpg' },
    { name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain-america', img: 'captain-america.jpg' },
    { name: 'fantastic-four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green-arrow',     img: 'green-arrow.jpg' },
    { name: 'green-lantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    { name: 'spiderman',       img: 'spiderman.jpg' },
    { name: 'superman',        img: 'superman.jpg' },
    { name: 'the-avengers',    img: 'the-avengers.jpg' },
    { name: 'thor',            img: 'thor.jpg' }
  ];

  self.size = 100;

  self.ctx = ctx;

  self.gameWidth = width;
  self.gameHeight = height;

  self.x = self.gameWidth / 2;
  self.y = self.gameHeight / 2;
  self.direction = null;
}

Player.prototype.setDirection = function (direction) {
  var self = this;

  // @todo not allow to change to opposite direction
  self.direction = direction;
}