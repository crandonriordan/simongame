const sounds = {
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

function playSound(color) {
  sounds[color].load();
  sounds[color].play();
};
