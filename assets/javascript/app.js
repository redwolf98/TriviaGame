var numberCorrect = 0;
var numberIncorrect = 0;
var numberMissed = 0;
var DEBUG = true
var currentQuestion;
var seconds = 20;

var firstQuestion = {question:"What is the name of the band that the famous guitarist Slash is a member?",
                     possibleAnswers:["Sex Pistols","Kiss","Guns N' Roses","Aerosmith"],
                     answerIndex:2,
                     answerString:"Slash is lead guitarist for the band Guns N' Roses.",
                     answerImageString:"assets\images\slashTheGuitarist.gif"};

var secondQuestion = {question:"What scientist is creditted with the discovery of Alternating Current?",
                      possibleAnswers:["Thomas Edison","Michael Faraday","Nikola Tesla","Benjamin Franklin"],
                      answerIndex:1,
                      answerString:"The principles of Alternating Current were discovered by Michael Faraday.",
                      answerImageString:"assets\images\michaelFaraday.gif"};

var thirdQuestion = {question:"Which war in the USA's history had the highest cassualties of Americans?",
                     possibleAnswers:["American Revolution","World War 2","War of 1812","Civil War"],
                     answerIndex:3,
                     answerString:"The American Civil War had the most American casualties with estimates between six and seven hundred thousand.",
                     answerImageString:"assets\images\civilWar.gif"};

var fourthQuestion = {question:"What Disney Villain was voiced by the famous horror actor Vincent Price?",
                      possibleAnswers:["Ratigan","Scar","Jafar","Captain Hook"],
                      answerIndex:0,
                      answerString:"Vincent Price voiced the mallicious Machiavelian rodent, Ratigan!",
                      answerImageString:"assets\images\ratigan.gif"};


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
    loadQuestion(firstQuestion);
}

function restartGame(){
    numberCorrect = 0;
    numberIncorrect = 0;
    numberMissed = 0;

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

function loadQuestion(question){
    
    var timerElement = $("<div>");
    timerElement.addClass("timer");
    timerElement.html("Timer Remaining: " + timerAsString());
    $(".gameSpace").append(timerElement);

    var questionElement = $("<div>");
    questionElement.addClass("question");
    questionElement.html(question.question);
    $(".gameSpace").append(questionElement);
    var possibleAnswersBox = $("<div>");
    possibleAnswersBox.addClass("possibleAnswerBox col-lg-12 col-lg-offset-1");
    for(i=0;i<question.possibleAnswers.length;i++){
        var answerElement = $("<div>");
        answerElement.addClass("possibleAnswer col-md-2 col-md-offset-3");
        answerElement.html(question.possibleAnswers[i]);
        answerElement.bind("click",function(){
            console.log("clickedAnswer");
            log(this);
            loadAnswer(current, this.index);
        });
        possibleAnswersBox.append(answerElement);
    }
    $(".gameSpace").append(possibleAnswersBox);
}

function loadAnswer(question, index){
    console.log(question);
    console.log(index);
}

function loadResults(){

}
