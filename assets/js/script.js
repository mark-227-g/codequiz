/************************************** 
Variables and References
**************************************/

var txtHighScoresEl = document.querySelector("#txtHighScores");
//var initialsEl = document.querySelector("#initials");

var finalScore=10;
/************************************** 
buttons
**************************************/


var backBtnEl = document.querySelector("#backBtn");
var clearBtnEl = document.querySelector("#clearBtn");
var addScoreBtnEl = document.querySelector("#addScoreBtn");
/************************************** 
functions
**************************************/
class Score {
    constructor(name,score)
    {
        this.name=name;
        this.score=score;
    }
    name()
    {
        return "nnn";
    }
    score()
    {
        return "sss"
    }

};
var scores=[];



/************************************** 
function - 
**************************************/
function f()
{
 
}
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
addScoreBtnEl.addEventListener("click", addScore);
backBtnEl.addEventListener("click", back);
clearBtnEl.addEventListener("click", clear);

showScores();
