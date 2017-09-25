

var correctCount = 0;
var incorrectCount = 0;
var missedCount = 0;
var DEBUG = true
var currentQuestionIndex = 0;
var currentQuestion;
var seconds = 20;
var timer;
var timerElement = $("<div>");
timerElement.addClass("timer");

var questions = [{question:"What is the name of the band that the famous guitarist Slash is a member?",
                     possibleAnswers:["Sex Pistols","Kiss","Guns N' Roses","Aerosmith"],
                     answerIndex:2,
                     answerString:"Slash is lead guitarist for the band Guns N' Roses.",
                     answerImageString:"assets/images/slashTheGuitarist.gif"},
                 {question:"What scientist is credited with the discovery of Alternating Current?",
                      possibleAnswers:["Thomas Edison","Michael Faraday","Nikola Tesla","Benjamin Franklin"],
                      answerIndex:1,
                      answerString:"The principles of Alternating Current were discovered by Michael Faraday.",
                      answerImageString:"assets/images/michaelFaraday.gif"},
                 {question:"Which war in the USA's history had the highest casualties of Americans?",
                     possibleAnswers:["American Revolution","World War 2","War of 1812","Civil War"],
                     answerIndex:3,
                     answerString:"The American Civil War had the most American casualties with estimates between six and seven hundred thousand.",
                     answerImageString:"assets/images/civilWar.gif"},
                 {question:"What Disney Villain was voiced by the famous horror actor Vincent Price?",
                      possibleAnswers:["Ratigan","Scar","Jafar","Captain Hook"],
                      answerIndex:0,
                      answerString:"Vincent Price voiced the mallicious Machiavelian rodent, Ratigan!",
                      answerImageString:"assets/images/ratigan.gif"}];


function log(input){
    if(DEBUG) console.log(input);
}

$(document).ready(function(){
    $(".startButton").on("click", function(){
            log("Clicked");
            clearGameSpace();
            startGame();
        });
});

function clearGameSpace(){
    $(".gameSpace").empty();
}

function startGame(){
    getNextQuestion();
    loadQuestion();
}

function restartGame(){
    correctCount = 0;
    incorrectCount = 0;
    missedCount = 0;
    currentQuestionIndex = 0
    getNextQuestion();
    loadQuestion();
}

function timerAsString(){
    var result = "";
    if(seconds >= 10){
        result = seconds.toString();
    }else{
        result = "0" + seconds.toString();
    }
    return result;
}

function loadQuestion(){

    clearGameSpace();

    timerElement.html("Timer Remaining: " + timerAsString());
    startCountdown();
    $(".gameSpace").append(timerElement);

    var questionElement = $("<div>");
    questionElement.addClass("question");
    questionElement.html(currentQuestion.question);
    $(".gameSpace").append(questionElement);
    var possibleAnswersBox = $("<div>");
    possibleAnswersBox.addClass("possibleAnswerBox col-lg-12 col-lg-offset-1");
    for(i=0;i<currentQuestion.possibleAnswers.length;i++){
        var answerElement = $("<div>");
        answerElement.addClass("possibleAnswer col-md-2 col-md-offset-3");
        answerElement.html(currentQuestion.possibleAnswers[i]);

        if(i === currentQuestion.answerIndex){
            answerElement.attr("isAnswer",true);
        }else{
            answerElement.attr("isAnswer",false);
        }

        answerElement.bind("click",function(){
            loadAnswer(this);
        });
        possibleAnswersBox.append(answerElement);
    }
    $(".gameSpace").append(possibleAnswersBox);
}

function loadAnswer(selectedAnswer){

    clearGameSpace();
    pauseCountdown();
    log($(selectedAnswer).attr("isanswer"));


    var userResultElement = $("<div>").addClass("userResult");
    var answerElement = $("<div>").addClass("answerSpace").html($(currentQuestion).attr("answerString"));
    var imageElement = $("<img>").addClass("imageSpace").attr("src",$(currentQuestion).attr("answerImageString"));

    log($(currentQuestion).attr("answerString"));

    if(selectedAnswer === null){
        missedCount++;
        log("nothing selected, timeout.")

        userResultElement.html("Timeout!");

    }else if($(selectedAnswer).attr("isAnswer") === "false"){
        incorrectCount++;
        log("wrong");

        userResultElement.html("Sorry - nope!");

    }else {
        correctCount++;
        log("correct");

        userResultElement.html("That right!");
    }
    log(answerElement)
    $(".gameSpace").append(timerElement);
    $(".gameSpace").append(userResultElement);
    $(".gameSpace").append(answerElement);
    $(".gameSpace").append(imageElement);
    
    setTimeout(function(){
        getNextQuestion();
        log(currentQuestion);

        if(currentQuestion){
            log("loadedQuestion");
            seconds = 20;
            loadQuestion();
        }else{
            log("loaded results");
            loadResults();
        }
    },2000);

}

function loadResults(){
    clearGameSpace();
    pauseCountdown();
    $(".gameSpace").append(timerElement);
    $(".gameSpace").append("<p>All done, here's how you did!</p>");
    $(".gameSpace").append("<p>Correct Answers: " + correctCount.toString() + "</p>");
    $(".gameSpace").append("<p>Incorrect Answers: " + incorrectCount.toString() + "</p>");
    $(".gameSpace").append("<p>Unanswered: " + missedCount.toString() + "</p>");
    
    var resetButton = $("<div>");
    resetButton.addClass("resetButton");
    resetButton.html("Reset");
    resetButton.bind("click", function(){
        restartGame();
    });
    $(".gameSpace").append(resetButton);
    


}


function getNextQuestion(){
    if(currentQuestionIndex > questions.length){
        currentQuestion = null;
    } else{
        currentQuestion = questions[currentQuestionIndex]
    }
    currentQuestionIndex ++;
}

function startCountdown(){
    timer = setInterval(function(){
        tick();
    },1000);
}

function pauseCountdown(){
    clearInterval(timer);
}

function tick(){
   seconds--;
   $(".timer").html("Timer Remaining: " + timerAsString());
   if(seconds === 0){
       log("timeout");
       loadAnswer(null);
   }
}