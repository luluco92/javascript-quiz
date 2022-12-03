var score1 = document.querySelectorAll("font")[0];
var timer1 = document.querySelectorAll("font")[1];
var starting = document.getElementById("startButton");
var question = document.getElementById("questheader");
var titlemenu = document.querySelector("aside");
var questBox = document.querySelectorAll("section")[0];
var resultBox = document.querySelectorAll("section")[1];
var scoreBox = document.querySelectorAll("section")[2];
var inputname = document.querySelector("input");
var questionpool = ["Commonly used data types DO NOT include:", "Arrays in Javascript are enclosed in ___", "Which one of these expressions is false?", "What is this?"]; // 4 q's minimum.
var aapool = ["strings", "{braces}", "9 == ''9''", "string" ];
var bbpool = ["alerts", "[brackets]", "'9' == 9", "boolean" ];
var ccpool = ["booleans", "'quotes'", "''9'' === 9", "array" ];
var ddpool = ["numbers", "(parentheses)", "'9' === ''9''", "object" ];
var answerkey = ["B", "B", "C", "D"];

var count = 0;
var score = 0;
var bonus = 0;
var teststring;
var timeLeft;
var newscores = [];


function updateScores() {
  var scoreList = scoreBox.children[1];
  // This line starts an empty list
  scoreList.innerHTML = "";

  newscores = JSON.parse(localStorage.getItem("jquizscores"));
  if (newscores === null) {
    var newli = document.createElement("li");
    newli.textContent = "	No scores yet";
    scoreList.appendChild(newli);
    return;
  }
  for (i = 0; i < newscores.length; i++) {

  var newli = document.createElement("li");
  newli.textContent = newscores[i];
  scoreList.appendChild(newli);
  }
}



// the standard timer
function setTime() {
  var timerON = setInterval(function() {
    timeLeft--;
    timer1.textContent = "Time: " + timeLeft;

    if (timeLeft === 10) {
    timer1.style.color = "red";
    }

    if(timeLeft <= 0 || count === answerkey.length ) {
      clearInterval(timerON);

      endQuiz();
    }

  }, 1000);
}

// Function to show each question
function showQuestion() {
{
question.textContent = questionpool[count];
document.getElementById("picka").textContent = "A. " + aapool[count];
document.getElementById("pickb").textContent = "B. " + bbpool[count];
document.getElementById("pickc").textContent = "C. " + ccpool[count];
document.getElementById("pickd").textContent = "D. " + ddpool[count];
}
}

// Function to end the test
function endQuiz() {
  resultBox.children[1].textContent = "Points: " + score;
  resultBox.children[2].textContent = "Bonus: " + bonus;
  resultBox.children[3].textContent = "Total: " + (score + bonus);
  timer1.textContent = "";
  timer1.style.color = "black";
  resultBox.style.display = "block";
  questBox.style.display = "none";

}

// gimme a function to check user's answer.
function checkAnswer(x) {
  if ( x === answerkey[count] ) {
     score+= 10;
     score1.textContent = "Score: " + score;
  }
  else {
  timeLeft -= 15;  
     if (timeLeft < 1) {
     timeLeft = 0;

     }
  }
  count++;

  if ( count === answerkey.length ) {
    bonus = timeLeft;
    timeLeft = 0;
    endQuiz();

  }
  else {
    showQuestion();
  }
}

// BUTTON: START QUIZ
starting.addEventListener("click", function() {
  score1.textContent = "Score: 0";
  timer1.textContent = "Time: 60";
  titlemenu.style.display = "none";
  questBox.style.display = "block";
  count = 0;
  score = 0;
  bonus = 0;
  timeLeft = 60;
  showQuestion(); 
  setTime();
});

// BUTTON: PICK A
document.getElementById("picka").addEventListener("click", function() {
  checkAnswer("A"); 
});

// BUTTON: PICK B
document.getElementById("pickb").addEventListener("click", function() {
  checkAnswer("B"); 
});

// BUTTON: PICK C
document.getElementById("pickc").addEventListener("click", function() {
  checkAnswer("C"); 
});

// BUTTON: PICK D
document.getElementById("pickd").addEventListener("click", function() {
  checkAnswer("D"); 
});



// BUTTON: SUBMIT SCORE
document.getElementById("addscoreButton").addEventListener("click", function() {

  if (newscores === null) {
    newscores = [];
  }

  score += bonus;
  newscores.push(inputname.value + " - " + score);
  localStorage.setItem("jquizscores", JSON.stringify(newscores));
  updateScores();
  scoreBox.style.display = "block";
  resultBox.style.display = "none";


});


// BUTTON: CLEAR HIGHSCORE
document.getElementById("clearButton").addEventListener("click", function() {
  localStorage.removeItem("jquizscores");
  updateScores();
});

// BUTTON: BACK TO TITLE
document.getElementById("returnButton").addEventListener("click", function() {
   score1.innerHTML = "<button>View Scores</button>";
   scoreBox.style.display = "none";
   titlemenu.style.display = "block";

});

// BUTTON: VIEW HIGHSCORE
score1.addEventListener("click", function(event) {
   if (event.target.matches("button")) {
   updateScores();
   titlemenu.style.display = "none";
   scoreBox.style.display = "block";
   }
});







