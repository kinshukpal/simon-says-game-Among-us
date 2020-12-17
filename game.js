var buttonColours= ["red", "blue", "green", "yellow"];

var gamePattern= [];

var userClickedPattern= [];

var started = false;
var level=0;

//startgame
$(".btn-start").click(function(){
  if(!started){
    $(this).hide();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;


}
});


//clicks a button

$(".btn").click(function(){

 var userChosenColour= $(this).attr("id")
 userClickedPattern.push(userChosenColour);

 playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer(currentLevel)
{

if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("success");

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
// if wrong answer
} else {
  var audio2 = new Audio("sounds/wrong.mp3");
  audio2.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over. Your reached till level "+(currentLevel+1)+ ".Refresh page again to Restart");

    startOver();
  }
}


// to choose the next button in sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

//playsound
function playSound(name){

  var audio1 = new Audio("sounds/"+ name +".mp3");
  audio1.play();
}

//add animation
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
