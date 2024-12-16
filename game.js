var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
       

    $("#level-title").text("Level"+ level);
nextSequence();
started=true;
}
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level"+ level);
   
    var randomNumber=Math.floor((Math.random()*4)); 
    var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);


}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var n=userClickedPattern.length-1;

    checkAnswer(n);



});
function playSound(name){

    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();

}
function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
},100);
}
function checkAnswer(currentlevel){

    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);

        }

    }
    else
    {
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();


    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
   
    



}