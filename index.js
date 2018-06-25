let greenButton = document.getElementById('green');
let redButton = document.getElementById('red');
let yellowButton = document.getElementById('yellow');
let blueButton = document.getElementById('blue');

// holds our option of buttons, and other button functions
let buttonObject = {
  buttons: [greenButton, redButton, yellowButton, blueButton],
  populateButtons: function(numberOfButtons) {
    buttonArray = [];
    for(let i = 0; i < numberOfButtons; i++) {
      // hard coded because we only have four options in simon game
      let indexOfButtonToAdd = getRandomInt(0, 4);
      buttonArray[i] = this.buttons[indexOfButtonToAdd];
    }
    return buttonArray;
  }
}


class Game {

  constructor() {
    this.display = document.getElementById("display");
    this.isStarted = false;
    this.isStrict = false;
    this.playersTurn = false;
    this.playerGuesses = [];
    this.numberOfWrongGuesses = 0;
    this.gameCount = 1; // number of buttons to press (if 20 -> win)
    this.seriesOfButtons = buttonObject.populateButtons(20); //need 20 btns for full simon game
  };

  // runs our simulated presses
  computerPress() {
    // scope issue with this when trying to delay timing
    if(!this.playersTurn && this.isStarted) {
      let i = 0;
      let btn = this.seriesOfButtons
      let interval = setInterval(function () {
        simulatedPress(this.seriesOfButtons[i]);
        i++;

        if(i >= this.gameCount) {
          clearInterval(interval);
          this.playersTurn = true;
          this.playerPress();
        }
      }.bind(this), 800);
    } else {
      throw 'is not players turn or game isn\'t running'
    }
  };

  playerPress() {
    this.addClickListeners();
  };

  //helpers
  addClickListeners() {
    for(let i = 0; i < buttonObject.buttons.length; i++) {
      // push the clicked element to playerGuesses property
      buttonObject.buttons[i].onclick = function() {
        playSound(buttonObject.buttons[i].id)
        this.playerGuesses.push(buttonObject.buttons[i]);
        // check if newly appended playerGuess is correct
        // if it is not
        // alert(wrong), removeClickListeners,
        //playersTurn = false; clear playerGuesses; computerPress();
        if(this.playerGuesses[this.playerGuesses.length - 1]
          === this.seriesOfButtons[this.playerGuesses.length - 1]) {
            // change turns to computer
            this.blinkMessage("correct");
            if(this.playerGuesses.length === this.gameCount) {
              console.log("inside if statement"); //debug
              this.removeClickListeners();
              this.playersTurn = false;
              this.playerGuesses.length = 0;
              this.gameCount++;
              this.computerPress();
            }
        } else { // handle a wrong input
            console.log("wrong guesses", this.numberOfWrongGuesses);
            if(this.numberOfWrongGuesses > 1) {
              console.log("number of guesses is too big");
              this.blinkMessage("too many guesses");
              this.setTimeout(this.reset, 200);
            }
            this.blinkMessage("wrong");
            this.numberOfWrongGuesses++;
            this.removeClickListeners();
            this.playersTurn = false;
            this.playerGuesses.length = 0;
            this.computerPress();
        }
      }.bind(this);
    }
  };

  removeClickListeners() {
    for(let i = 0; i < buttonObject.buttons.length; i++) {
      buttonObject.buttons[i].onclick = null;
    }
  };

  start() {
    this.isStarted = true;
    this.computerPress();
  };

  reset() {
    console.log("resetting"); //debug
    this.isStarted = false;
    this.gameCount = 0;
    this.seriesOfButtons = buttonObject.populateButtons(20);
    this.numberOfWrongGuesses = 0;
    this.isStrict = 0;
    this.playersTurn = false;
  };

  strict() {
    this.isStrict = true;
  };

  blinkMessage(string) {
    let i = 0;
    let interval = setInterval(function() {
      if(i > 5) {
        this.display.innerHTML = "8 bit display";
        clearInterval(interval);
      } else if(i % 2 == 0) {
        this.display.innerHTML = string;
      } else {
        this.display.innerHTML = "";
      }
      i++;
    }.bind(this), 200)
  };

}

// helper functions

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Start up


function simulatedPress(button) {
  playSound(button.id);
  button.classList.add("lit");
  setTimeout(function() {
    button.classList.remove("lit");
  }, 400);
}

function playSound(color) {
  // uses sounds object in audio.js
  sounds[color].load();
  sounds[color].play();
}


let game = new Game();

document.getElementById("start").onclick = game.start.bind(game);
document.getElementById("reset").onclick = game.reset.bind(game);
document.getElementById("strict").onclick = game.strict.bind(game);
