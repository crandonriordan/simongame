let greenButton = document.getElementById('green');
let redButton = document.getElementById('red');
let yellowButton = document.getElementById('yellow');
let blueButton = document.getElementById('blue');

class Game {
  constructor() {
    this.isStarted = false;
    this.isStrict = false;
    this.gameCount = 0;
    this.seriesOfButtons = [greenButton, redButton, yellowButton, blueButton];
  }

  gamePress() {
    let length = this.seriesOfButtons.length;
    let count = 0;
    let timeoutOne = 100;
    let timeoutTwo = 1000;
    // increment timing for each loop;
    let incrementalTime = 600;
    // timing of presses
    for(let i = 0; i < length; i++) {
      let currButton = this.seriesOfButtons[i];
      setTimeout(function() {
        togglePress(currButton, "lit");
        timeoutOne += incrementalTime;
      }, timeoutOne)

      setTimeout(function() {
        togglePress(currButton, "lit");
        timeoutTwo += incrementalTime;
      }, timeoutTwo)
    }
  }

}

let game = new Game();
console.log(game);


// anonymous functions

// press() anon f(x)
function togglePress(button, className) {
  button.classList.toggle(className);
}
