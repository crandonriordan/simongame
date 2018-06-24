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
      throw `is not players turn or game isn't running`
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
        this.playerGuesses.push(buttonObject.buttons[i]);
        // check if newly appended playerGuess is correct
        // if it is not
        // alert(wrong), removeClickListeners,
        //playersTurn = false; clear playerGuesses; computerPress();
        if(this.playerGuesses[this.playerGuesses.length - 1]
          === this.seriesOfButtons[this.playerGuesses.length - 1]) {
            if(this.playerGuesses.length === this.gameCount) {
              this.removeClickListeners();
              this.playersTurn = false;
              this.playerGuesses.length = 0;
              this.gameCount++;
              this.computerPress();
            }
        } else {
            alert("wrong guess");
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
  sounds[color].load();
  sounds[color].play();
}


let game = new Game();
game.isStarted = true;
