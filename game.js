
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){

  if(!started){
  $('#level-title').text('Level ' + level);
  nextSequence();

  started = true;

}
});

$('.btn').click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){

  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

animatePress(randomChosenColour);
playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  if(userClickedPattern.length === gamePattern.length)
  {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
  else{

  }
}else{
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
  $(document).addClass('game-over');
  setTimeout(function () {
    $(document).removeClass('game-over');
  }, 200);
  $('#level-title').text('Game Over, Press Any Key to Restart');
  startOver();
}
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}


function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour)
{
  $('#' + currentColour).addClass('pressed');
  setTimeout(function() {
         $('#' + currentColour).removeClass("pressed");
     }, 100);
}
