'use strict';


// get simon game buttons
let green = document.getElementById("green");
let red = document.getElementById("red");
let yellow = document.getElementById("yellow");
let blue = document.getElementById("blue");

// random function for board object
// used from mozillas MDN for JavaScript
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// game has-a player relationship (composition)
let player = {
  isPlayersTurn: false,
  numberOfGuesses: 0,
  playerPresses: [],
  emptyPresses: function() {
    this.playerPresses.length = 0;
  },

  reset: function() {
    this.isPlayersTurn = false;
    this.emptyPresses();
  }
};

// helper functions and holds our buttons
let board = {
  buttons: [green, red, yellow, blue],
  // populate 20 random buttons
  populateButtons: function() {
    let randomButtons = [];
    for(let i = 0; i < 20; i++) {
      let randomInt = getRandomInt(0, 4);
      randomButtons.push(this.buttons[randomInt]);
    }
    return randomButtons;
  },

  isSameButton: function(buttonOne, buttonTwo) {
    if(buttonOne === buttonTwo) {
      return true;
    } else {
      return false;
    }
  },

  flashMessage: function(message) {
    let display = document.getElementById("display");
    let i = 0;
    let interval = setInterval(function() {
      if(i > 8) {
        display.innerHTML = "8 bit display";
        clearInterval(interval);
      } else if(i % 2 == 0) {
        display.innerHTML = message;
      } else {
        display.innerHTML = "";
      }
      i++;
    }.bind(this), 100)
  }
}

function pressButton(button) {
  button.classList.add("lit");
  playSound(button.id);
}

function unPressButton(button) {
  button.classList.remove("lit");
}

class Game {
  constructor() {
    // states of game
    this.isStrict = false;
    this.isStarted = false;
    this.gameCount = 1;
    this._player = player;
    this.buttonPresses = board.populateButtons();
    document.getElementById("start").onclick = this.start.bind(this);
    document.getElementById("reset").onclick = this.reset.bind(this);
    document.getElementById("strict").onclick = this.strict.bind(this);
  };

  start() {
    this.isStarted = true;
    this.showButtonPresses();
  };

  reset() {
    this.isStarted = false;
    this.gameCount = 1;
    this.isStrict = false;
    this._player.reset();
    this.removeListeners();
  };

  strict() {
    if(this.isStrict) {
      this.isStrict = false;
    } else {
      this.isStrict = true;
    }
  };

  showButtonPresses() {
    // show the button presses in a .5s on .5s off fashion
    // show the correct amount (controlled by this.gameCount)
    let i = 0;
    // make sure game is started
    if(this.isStarted || this._player.isPlayersTurn) {
      let interval = setInterval(function() {
        if(i >= this.gameCount - 1) {
          clearInterval(interval);
          this._player.isPlayersTurn = true;
          this.playerPresses();
        }
        let buttonToPress = this.buttonPresses[i];
        pressButton(buttonToPress);
        //turn off after .5s
        setTimeout(function() {
          unPressButton(buttonToPress);
        }, 500);
        i++;
        // if we've shown the correct number stop the loop
      }.bind(this), 1000);
    } else if (!this.isStarted) {
      throw "game not started";
    } else {
      throw "player's turn";
    }
  };

  playerPresses() {
    this.addListeners();
  }

  addListeners() {
    board.buttons.forEach(button => {
      button.onclick = function() {
        playSound(button.id);
        this._player.playerPresses.push(button);
        let indexOfRecent = this._player.playerPresses.length - 1
        if(board.isSameButton(button, this.buttonPresses[indexOfRecent])) {
          board.flashMessage("correct");
          // if guessed the correct sequence entirely
          // make this a function!!!!! CODE SMELL
          let counter = 0;
          this._player.playerPresses.forEach(button => {
            if(button === this.buttonPresses[counter]) {
              counter++;
            }
          });

          if(counter === this.buttonPresses.length) {
            this.win();
            return;
          }
          counter = 0;

          if(this._player.playerPresses.length === this.gameCount) {
            this.gameCount++;
            this._player.reset();
            this.removeListeners();
            this.showButtonPresses();
          }
        } else { // if it is incorrect
          board.flashMessage("wrong");
          this._player.numberOfGuesses++;
          if(this.isStrict || this._player.numberOfGuesses > 1) {
            this.reset();
            return;
          }
          this.removeListeners();
          this._player.reset();
          setTimeout(this.showButtonPresses.bind(this), 500);
        }
      }.bind(this);
    });
  };

  removeListeners() {
    board.buttons.forEach(button => {
      button.onclick = null;
    });
  };

  win() {
    board.flashMessage("WINNER!");
    setTimeout(this.reset.bind(this), 1000);
  }
}

let game = new Game();