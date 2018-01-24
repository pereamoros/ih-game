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
    startGameButton.removeEventListener('click', handleStartClick);
    splashElement.remove();
  }

  // -- GAME
  function buildGame() {
    stage = 'game';
    game = new Game(mainElement);
    game.onEnd = function(score) {
      destroyGame();
      buildGameOver();
      console.log('score', score);
    }
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

    gameOverElement = document.createElement('div');
    gameOverElement.setAttribute('id', 'game-over');

    var title = document.createElement('h1');
    title.innerText = 'Dead Already?';
    gameOverElement.appendChild(title);

    playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play Again';
    gameOverElement.appendChild(playAgainButton);

    mainElement.appendChild(gameOverElement);

    playAgainButton.addEventListener('click', handlePlayAgainClick);
  }

  function destroyGameOver() {
    playAgainButton.removeEventListener('click', handlePlayAgainClick);
    gameOverElement.remove();
  }

  buildGame();

}
var game; //global scope to access it and be able to pass variables in functions in it
window.onload = main;