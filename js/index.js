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

    splashElement = document.createElement('div');
    splashElement.setAttribute('class', 'splash');

    var titleH1 = document.createElement('h1');
    titleH1.innerText = "POISON!" ;
    splashElement.appendChild(titleH1);
    var logoImage = document.createElement('img');
    logoImage.setAttribute('src', './img/poison-logo.png');
    splashElement.appendChild(logoImage);
    var breakLine = document.createElement('br');
    splashElement.appendChild(breakLine);
    startGameButton = document.createElement('button');
    startGameButton.innerText = 'START';
    splashElement.appendChild(startGameButton);

    mainElement.appendChild(splashElement);

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
    gameOverElement.setAttribute('class', 'game-over');

    var gameOverImg = document.createElement('img');
    gameOverImg.setAttribute('src','./img/game-over.png');
    gameOverElement.appendChild(gameOverImg);

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

  buildSplash();

}
var game; //global scope to access it and be able to pass variables in functions in it
window.onload = main;