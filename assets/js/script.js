/************************************** 
Variables and References
**************************************/

var txtHighScoresEl = document.querySelector("#txtHighScores");
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
save score
**************************************/
scores.push(new Score("mark","50"));
scores.push(new Score("clark","60"));


localStorage.setItem("scores", JSON.stringify(scores));

/************************************** 
get score
**************************************/


var scores2=((JSON.parse(localStorage.getItem("scores"))));
console.log(scores)
console.log(scores2);

for(i=0;i<scores2.length;i++)
{
    console.log(scores2[i]);
    el=document.createElement('li');
    el.innerHTML=scores2[i].name+" - "+scores2[i].score;
  
    txtHighScoresEl.appendChild(el) //.textContent=scores2[i].name+" - "+scores2[i].score;
};


