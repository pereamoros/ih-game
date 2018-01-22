'use strict';

function main() {

  var mainElement = document.querySelector('#site-main');
  var stage;
  
  // -- SPLASH

  var splashElement;
  var startGameButton;
  var handleStartClick = function () {
    destroySplash();
    buildGame();
  };

  function buildSplash() {
    stage = 'splash';

    // create dom elements
    splashElement = document.createElement('div');
    splashElement.setAttribute('id', 'splash');

    var titleH1 = document.createElement('h1');
    titleH1.innerText = 'DEADLINE';
    splashElement.appendChild(titleH1);

    startGameButton = document.createElement('button');
    startGameButton.innerText = 'start';
    splashElement.appendChild(startGameButton);

    // apppend to site-main
    mainElement.appendChild(splashElement);

    // bind click on start play button
    startGameButton.addEventListener('click', handleStartClick);
  }

  function destroySplash() {
    // unbind click on start play button
    startGameButton.removeEventListener('click', handleStartClick);
    // remove splash from dom
    splashElement.remove();
  }

  // -- GAME
  //var game;

  function buildGame() {
    stage = 'game';
    game = new Game(mainElement);
    game.onEnd = function(score) {
      destroyGame();
      buildGameOver();
      console.log('score', score);
    }

    // window.setTimeout(function () {
    //   destroyGame();
    //   buildGameOver();
    // }, 2000);
  }

  function destroyGame() {
    game.destroy();
    console.log('destroyed');
  }

  // -- GAME OVER

  var gameOverElement;
  var playAgainButton;
  var handlePlayAgainClick = function () {
    destroyGameOver();
    buildGame();
  };

  function buildGameOver() {
    stage = 'gameOver';

    // create dom elements
    gameOverElement = document.createElement('div');
    gameOverElement.setAttribute('id', 'game-over');

    var title = document.createElement('h1');
    title.innerText = 'Dead Already?';
    gameOverElement.appendChild(title);

    playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play Again';
    gameOverElement.appendChild(playAgainButton);

    // apppend to site-main
    mainElement.appendChild(gameOverElement);

    // bind click on start play button
    playAgainButton.addEventListener('click', handlePlayAgainClick);
  }

  function destroyGameOver() {
    // unbind click on start play button
    playAgainButton.removeEventListener('click', handlePlayAgainClick);
    // remove gameOver from dom
    gameOverElement.remove();
  }

  buildGame();

}
var game; //global scope to access it and be able to pass variables in functions in it
window.onload = main;