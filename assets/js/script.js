/************************************** 
References
**************************************/

var timerEl = document.getElementById("timeLeft");
var mustBeCorrect = false;
var timeInterval
function mytime ()
{
    console.log(timeLeft);
    timeLeft=timeLeft-1;
    document.getElementById("timeLeft").innerText="Time: "+timeLeft;
    if(timeLeft<=0)
    {
        clearInterval(timeInterval);
        done();
    }
}

/************************************** 
global variables
**************************************/
var finalScore=0;
var rightAnswer=0;
var timeLeft=100;
var currentQuestion=0;
var scores=[];
var questions=[];

/************************************** 
buttons
**************************************/
var startBtnEl = document.querySelector("#startBtn");
var backBtnEl = document.querySelector("#backBtn");
var clearBtnEl = document.querySelector("#clearBtn");
var addScoreBtnEl = document.querySelector("#addScoreBtn");
var answer1BtnEl = document.querySelector("#answer1Btn");
var answer2BtnEl = document.querySelector("#answer2Btn");
var answer3BtnEl = document.querySelector("#answer3Btn");
var answer4BtnEl = document.querySelector("#answer4Btn");
var showScoresEl = document.getElementById("scoreLink");

/************************************** 
classes
**************************************/
class Score 
{
    constructor(name,score)
    {
        this.name=name;
        this.score=score;
    };
};

class Question 
{
    constructor(question, a1, a2, a3, a4, answer)
    {
        this.question=question;
        this.a1 = a1;
        this.a2 = a2;
        this.a3= a3;
        this.a4 = a4;
        this.answer = answer;
    }
};

function displayTime(){
    timerEl.innerHTML="Time: "+timeLeft;
    console.log("time left " +timeLeft);
}


/* ----- Begin Question Section -----*/

/************************************** 
function - Start
**************************************/
function start()
{
    loadQuestions();
    timeInterval= setInterval(mytime,1000);
    displayTime();
    hideAllCards();
    showEl(document.getElementById("questionCard"),true);

    askQuestion();
}

/************************************** 
function - Ask Question
**************************************/
function askQuestion()
{
    //.log("ask question");
    //console.log(questions);
    //console.log("number of questions ",questions.length);
    //console.log("current question ",currentQuestion);
    if(currentQuestion==questions.length)
    {
      //  console.log("last question"+currentQuestion);
        done();
    }
    else
    {
       // console.log("ask question"+ currentQuestion);
        document.getElementById("question").innerText = questions[currentQuestion].question;
      //  console.log(questions[currentQuestion].question);
        document.getElementById("answer1Btn").textContent=questions[currentQuestion].a1;
        document.getElementById("answer2Btn").textContent=questions[currentQuestion].a2;
        document.getElementById("answer3Btn").textContent=questions[currentQuestion].a3;
        document.getElementById("answer4Btn").textContent=questions[currentQuestion].a4;
        rightAnswer=questions[currentQuestion].answer;
    };
};
 
/************************************** 
function - loadQuestions
**************************************/
function loadQuestions()
{
   // console.log("load questions");
    questions.push(new Question("Commonly used data types DO Not Include:",
    "1. strings","2. booleans","3. alerts", "4. numbers","2"));
    questions.push(new Question("The Condition in an if / else statement is enclosed with _____",
    "1.quotes","2. curly brackets","3. parenthesis", "4. square brackets","3"));
    questions.push(new Question("Arrays in JavaScript can be used to store ______.",
    "1.numbers and strings","2. other arrays","3. booleans", "4. all of the above","4"));
    questions.push(new Question("String values must be enclosed within _____ when being assigned to variables.",
    "1.commas","2. curly brackets","3. quotes", "4. parenthesis","3"));
    questions.push(new Question("A very usefull tool used during development and debugging for printing contend to the debugger is:",
    "1. JavaScript","2. terminal/bash","3. for loops", "4. console.log","4"));
}

/************************************** 
function - timer
**************************************/


/************************************** 
function - checkAnswer
**************************************/
function checkAnswer(event)
{
    const button = event.target;
    //.log(button);
    //console.log(rightAnswer);
    if(button.value==rightAnswer) {
        finalScore++;
        document.getElementById("answerMsg").textContent="Correct!";
        currentQuestion++;
        askQuestion();

    }
    else
    {
        document.getElementById("answerMsg").textContent="Wrong!";
        timeLeft=timeLeft-10;
        if(mustBeCorrect==false)
        {
            currentQuestion++;
            askQuestion(); 
        }
    };
};
/* ------- End Question Section -----*/

/* ------- Begin Score Section -------*/

/************************************** 
function - showScores
**************************************/
function showScores()
{
   // console.log("show scores");
    var highScoresEl = document.getElementById("highScores");
    emptyList();
    scores=((JSON.parse(localStorage.getItem("scores"))));
    if(scores != null)
    {   
       // console.log(scores);
        scores.sort(function(a, b){return b.score-a.score});
        for(i=0;i<scores.length;i++)
        {
         //   console.log(scores[i]);
            el=document.createElement('li');
            el.classList="score";
            el.innerHTML=scores[i].name+" - "+scores[i].score;
            highScoresEl.appendChild(el);
         //   console.log("new li "+el.classList)
            //.textContent=scores[i].name+" - "+scores[i].score;
        };
    };
}

/************************************** 
function - addScore
Adds the new score to the list of high scores
Saves the scores to local storage
calls showscores to display the new score in the list
**************************************/
function addInitials()
{
    console.log("add score")
    var x=document.getElementById("initials");
    console.log(x.value.length);
    console.log("------");
    if(x.value.length>0)
    {
       

    var scores=((JSON.parse(localStorage.getItem("scores"))));
   // console.log(scores);
    if(scores == null)
    {
        scores=[(new Score(document.getElementById("initials").value,timeLeft))];
    }
    else
    { 
        scores.push(new Score(document.getElementById("initials").value,timeLeft));
    };
   // console.log("add to local "+scores);
    localStorage.setItem("scores", JSON.stringify(scores));
    showScores();

    hideAllCards();
    showEl(document.getElementById("scoreCard"),true);
};
}

/************************************** 
function - emptyList
Removes the high score list from the html page
**************************************/
function emptyList()
{
    var highScoresEl = document.getElementById("highScores");
    while (highScoresEl.hasChildNodes())
    { 
        highScoresEl.removeChild(highScoresEl.firstChild);
      //  console.log("remove")
    }
}

/* ------- End Score Section ---------*/

function done()
{
    clearInterval(timeInterval);
    showEl(document.getElementById("questionCard"),false);
    showEl(document.getElementById("doneCard"),true);
    document.getElementById("finalscore").textContent= "Your final score is "+finalScore;
}
/************************************** 
function - back 
**************************************/
function back()
{
    hideAllCards();
    showEl(document.getElementById("startCard"),true);
}/************************************** 
function - clear
deletes the scores from memory and calls emptylist
**************************************/
function clear()
{
    emptyList();
    localStorage.removeItem("scores");
  //  showScores();
 
}
/************************************** 
s
**************************************/
function showHighScores()
{
    clearInterval(timeInterval);
    hideAllCards();
    showEl(document.getElementById("scoreCard"),true);
}

function hideAllCards()
{
    var allCards = document.getElementsByClassName("card")
    console.log(allCards);
    for (let i = 0; i < allCards.length; i++) 
    {
        showEl(allCards[i],false);
        console.log(allCards[i].visibility);
      }
}
/************************************** 
Set element visibile property
**************************************/
function showEl(El, b)
{
  if(b)
    {El.style.visibility="visible";}
  else
    {El.style.visibility="hidden";}
}
/************************************** 
Set element disabled property
**************************************/
function disableEl(El, b)
{
  if(b)
    { El.disabled="disabled";}
  else
    { El.disabled="";}
}

/************************************** 
Add event listener to generate button
**************************************/
startBtnEl.addEventListener("click", start);
answer1BtnEl.addEventListener("click", checkAnswer);
answer2BtnEl.addEventListener("click", checkAnswer);
answer3BtnEl.addEventListener("click", checkAnswer);
answer4BtnEl.addEventListener("click", checkAnswer);
addScoreBtnEl.addEventListener("click", addInitials);
backBtnEl.addEventListener("click", back);
clearBtnEl.addEventListener("click", clear);
showScoresEl.addEventListener("click",showHighScores);

showScores();
