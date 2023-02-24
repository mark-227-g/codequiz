/************************************** 
Variables and References
**************************************/

var txtHighScoresEl = document.querySelector("#txtHighScores");
//var initialsEl = document.querySelector("#initials");

var finalScore=10;
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
/************************************** 
functions
**************************************/
class Score 
{
    constructor(name,score)
    {
        this.name=name;
        this.score=score;
    };
};
var scores=[];

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
var questions=[];



/* ----- Begin Question Section -----*/

function start()
{
    loadQuestions();
    askQuestion();
}
/************************************** 
function - Ask Question
**************************************/
function askQuestion()
{
    console.log("ask question");
    //console.log(questions);
    console.log(questions.length);
    for(var i=0;i<questions.length;i++)
    {
        document.getElementById("question").innerText = questions[i].question;
        console.log(questions[i].question);
        document.getElementById("answer1Btn").textContent=questions[i].a1;
        document.getElementById("answer2Btn").textContent=questions[i].a2;
        document.getElementById("answer3Btn").textContent=questions[i].a3;
        document.getElementById("answer4Btn").textContent=questions[i].a4;
    };
};
 
/************************************** 
function - loadQuestions
**************************************/
function loadQuestions()
{
    console.log("load questions");
    questions.push(new Question("Commonly used data types DO Not Include:",
    "1. strings","2. booleans","3. alerts", "4. numbers","2"));
    questions.push(new Question("The Condition in an if / else statement is enclosed with _____",
    "1.quotes","2. curly brackets","3. parenthesis", "4. square brackets","3"));
    questions.push(new Question("Arrays in JavaScript can be used to store ______.",
    "1.numbers and strings","2. other arrays","3. booleans", "4. all of the above","4"));
    questions.push(new Question("String values must be enclosed within _____ when being assigned to variables.",
    "1.commas","2. curly brackets","3. quotes", "4. parenthesis","2"));
    questions.push(new Question("A very usefull tool used during development and debugging for printing contend to the debugger is:",
    "1. JavaScript","2. terminal/bash","3. for loops", "4. console.log","3"));
}

function answer()
{
    document.getElementById("answerMsg").textContent="Correct!";
    document.getElementById("answerMsg").textContent="Wrong!";
};
/* ------- End Question Section -----*/




/* ------- Begin Score Section -------*/

/************************************** 
function - showScores
**************************************/
function showScores()
{
    console.log("show scores");
    emptyList();
    scores=((JSON.parse(localStorage.getItem("scores"))));
    if(scores != null)
    {
        console.log(scores);
    for(i=0;i<scores.length;i++)
        {
            console.log(scores[i]);
            el=document.createElement('li');
            el.innerHTML=scores[i].name+" - "+scores[i].score;
        
            txtHighScoresEl.appendChild(el) //.textContent=scores[i].name+" - "+scores[i].score;
        };
    };
}

/************************************** 
function - addScore
Adds the new score to the list of high scores
Saves the scores to local storage
calls showscores to display the new score in the list
**************************************/
function addScore()
{
    console.log("add score")
    var scores=((JSON.parse(localStorage.getItem("scores"))));
    console.log(scores);
    if(scores == null)
    {
        scores=[(new Score(document.getElementById("xyz").value,finalScore))];
    }
    else
    { 
        scores.push(new Score(document.getElementById("xyz").value,finalScore));
    };
    console.log("add to local "+scores);
    localStorage.setItem("scores", JSON.stringify(scores));
    showScores();
    
}

/************************************** 
function - emptyList
Removes the high score list from the html page
**************************************/
function emptyList()
{
    var HighScores = document.getElementById("txtHighScores");
    while (HighScores.hasChildNodes())
    { 
        HighScores.removeChild(HighScores.firstChild);
        console.log("remove")
    }
}

/* ------- End Score Section ---------*/


/************************************** 
function - back 
**************************************/
function back()
{
 
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
Add event listener to generate button
**************************************/
startBtnEl.addEventListener("click", start);
answer1BtnEl.addEventListener("click", answer);
answer2BtnEl.addEventListener("click", answer);
answer3BtnEl.addEventListener("click", answer);
answer4BtnEl.addEventListener("click", answer);
addScoreBtnEl.addEventListener("click", addScore);
backBtnEl.addEventListener("click", back);
clearBtnEl.addEventListener("click", clear);

showScores();
