let greenButton = document.getElementById('green');
let redButton = document.getElementById('red');
let yellowButton = document.getElementById('yellow');
let blueButton = document.getElementById('blue');

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
    this.gameCount = 0;
    this.seriesOfButtons = buttonObject.populateButtons(3); //need 20 btns for full simon game
  }

  gamePress() {
    // scope issue with this when trying to delay timing
    let i = 0;
    let btn = this.seriesOfButtons
    var interval = setInterval(function () {
      simulatedPress(this.seriesOfButtons[i]);
      i++;

      if(i >= this.seriesOfButtons.length) {
        clearInterval(interval);
      }
    }.bind(this), 800);
  }
}

// helper functions

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Start up
let game = new Game();

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
