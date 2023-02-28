/************************************** 
References
**************************************/
var timerEl = document.getElementById("timeLeft");
var mustBeCorrect = false;
var timeInterval

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

/************************************** 
functions
**************************************/
function displayTime()
{
    timerEl.innerHTML="Time: "+timeLeft;
}

function mytime ()
{
    timeLeft=timeLeft-1;
    document.getElementById("timeLeft").innerText="Time: "+timeLeft;
    if(timeLeft<=0)
    {
        clearInterval(timeInterval);
        done();
    }
}

/* ----- Begin Question Section -----*/

/************************************** 
function - Start
load questions
initialize timer
show the question card and ask the first question
**************************************/
function start()
{
    loadQuestions();
    timeLeft=100;
    timeInterval= setInterval(mytime,1000);
    displayTime();
    hideAllCards();
    showEl(document.getElementById("questionCard"),true);
    askQuestion();
}

/************************************** 
function - Ask Question
fill in the question card with the questions
save the correct answer

if there are no move questions then move to done
**************************************/
function askQuestion()
{
   if(currentQuestion==questions.length)
    {
        done();
    }
    else
    {
        document.getElementById("question").innerText = questions[currentQuestion].question;
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
function - checkAnswer
check which button the user pressed
and compare to the correct answer
if the answer is wrong deduct time
**************************************/
function checkAnswer(event)
{
    const button = event.target;
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
load scores from local storage
sort the scores so the highest number is first
add list item elements to display score
**************************************/
function showScores()
{
    var highScoresEl = document.getElementById("highScores");
    emptyList();
    scores=((JSON.parse(localStorage.getItem("scores"))));
    if(scores != null)
    {   
        scores.sort(function(a, b){return b.score-a.score});
        for(i=0;i<scores.length;i++)
        {
            el=document.createElement('li');
            el.classList="score";
            el.innerHTML=scores[i].name+" - "+scores[i].score;
            highScoresEl.appendChild(el);
        };
    };
}

/************************************** 
function - addInitials
Adds the new score to the list of high scores
Saves the scores to local storage
calls showscores to display the new score in the list
**************************************/
function addInitials()
{
    var x=document.getElementById("initials");
    if(x.value.length>0)
    {
        var scores=((JSON.parse(localStorage.getItem("scores"))));
        if(scores == null)
        {
            scores=[(new Score(document.getElementById("initials").value,timeLeft))];
        }
        else
        { 
            scores.push(new Score(document.getElementById("initials").value,timeLeft));
        };

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
    }
}

/************************************** 
function - show highScores
**************************************/
function showHighScores()
{
    clearInterval(timeInterval);
    hideAllCards();
    showEl(document.getElementById("scoreCard"),true);
}


/* ------- End Score Section ---------*/

/************************************** 
function - done
The done section displays the final score.
The user can enter their initials for the high score
**************************************/
function done()
{
    clearInterval(timeInterval);
    displayTime()
    showEl(document.getElementById("questionCard"),false);
    showEl(document.getElementById("doneCard"),true);
    document.getElementById("finalscore").textContent= "Your final score is "+timeLeft;
}

/************************************** 
function - back 
The back function restarts the quiz
**************************************/
function back()
{
    hideAllCards();
    showEl(document.getElementById("startCard"),true);
}

/************************************** 
function - clear
deletes the scores from memory and calls emptylist
**************************************/
function clear()
{
    emptyList();
    localStorage.removeItem("scores");
}


/************************************** 
function - hide cards
sets all elements with class card
to hidden
**************************************/
function hideAllCards()
{
    var allCards = document.getElementsByClassName("card")
    for (let i = 0; i < allCards.length; i++) 
    {
        showEl(allCards[i],false);
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

