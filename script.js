var startBtn = document.getElementById("start")
var welcome = document.getElementById("welcome")

var quiz = document.getElementById("quiz")
var question = document.getElementById("question")
var answers = document.getElementById("answers")
var timer = document.getElementById("timer");
var highScoresButton = document.getElementById("highScores");
var header = document.querySelector("header");
var highScoreButtonsWrapper = document.getElementById("highscore-buttons");


var timeLeft = 40;
var score = 0;
var qIndex = 0;
var userScores = JSON.parse(localStorage.getItem("userInfo")) || [];

var qAndA = [
    {
        question: "What is javascript?",
        choices: ["A. Python Language", "B. Water Bottle", "C. Coding Language", "D. Website"],
        correct: "C. Coding Language"
    },
    {
        question: "Which of these give a summary of your code?",
        choices: ["A. Git Pull", "B. Git Commit", "C. Git Push", "D. Git Add"],
        correct: "B. Git Commit"
    },
     
    {   question: "Which coding language is univerally understood?",
        choices: ["A. Java",  "B. Javascript", "C. Python", "D. Style.css"],
        correct: "C. Python"
     },
      
     {   question: "The nav function:",
         choices:["A. Navigates the website", "B. Unlocks restricted pages", "C. Orders lists", "D. Highlights text"],
         correct: "A. Navigates the website"
      }  
    ]   

// quiz.style.display = "none"

startBtn.addEventListener("click", function () {
    welcome.style.display = "none"
    quiz.style.display = "block"
    var startTimer = setInterval(function() {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(startTimer);
        }
    }, 1000); // 1000ms = 1s
    showQuestions()
})

function showQuestions() {
    question.innerHTML = "";
    answers.innerHTML = "";
    var userQ = qAndA[qIndex].question;
    var userA = qAndA[qIndex].choices;
    question.innerHTML = userQ;
    userA.forEach(function (nextSetOfAnswers) {
        let listItem = document.createElement("li");
        listItem.style.listStyle = "none"
        listItem.innerHTML = nextSetOfAnswers;
        answers.appendChild(listItem)
        listItem.addEventListener("click", function (event) {
            let choice = event.target
            var decision = document.createElement("p");
            decision.className = "decision";
            quiz.append(decision)
            if (choice.textContent === qAndA[qIndex].correct) {
                score = score + 10
                console.log(score);
                decision.innerHTML = "Correct!"
            } else {
                score = score - 10
                console.log(score);
                decision.innerHTML = "Wrong!"
            }
        
            qIndex++
            if (qIndex >= qAndA.length) {
                finished()
            } else {
                showQuestions(qIndex)
            }
        })
    })
}

function finished() {
    quiz.innerHTML = "";
    var header = document.createElement("h2")
    var finalScore = document.createElement("p");  
    header.innerHTML = "Quiz Over!";
  
    quiz.appendChild(header)
    if (score <= 0) {
        score = 0
    }
    finalScore.innerHTML = " You got a score of: " + score;
    quiz.appendChild(finalScore);
    var input = document.createElement("input")
    input.type = "text";
    input.placeholder = "Initials.."
    quiz.appendChild(input)
    var submit = document.createElement("button")
    submit.className = "btn";
    submit.innerHTML = "Submit"
    quiz.appendChild(submit)
    submit.addEventListener("click", function() {
        var initials = input.value;
        if(initials === "") {
            alert("Please Enter Your Initials!")
        } else {

            var userScore = {initials: initials, score: score}
            userScores.push(userScore);
            localStorage.setItem("userInfo", JSON.stringify(userScores))
        }
        var scores = document.createElement("ol")
        quiz.appendChild(scores)
        var userData = JSON.parse(localStorage.getItem("userInfo"));

        for(let i = 0; i< userData.length; i++) {
            var list = document.createElement("li");
            list.innerHTML = userData[i].initials + ", your score is " + userData[i].score
            scores.appendChild(list)
        }

    })
}   

highScoresButton.addEventListener("click", function() {

    header.style.display = "none";
    welcome.style.display = "none";
    quiz.style.display = "none";
    highScoreButtonsWrapper.style.display = "block";


    var heading = document.createElement("h2");
    heading.innerHTML = "High Scores";
    highScoreButtonsWrapper.appendChild(heading);
    var scores = document.createElement("ol")
    highScoreButtonsWrapper.appendChild(scores)
    var userData = JSON.parse(localStorage.getItem("userInfo"));

    if(userData === null) {
        alert("No High Scores Yet!")
    } else {
    for(let i = 0; i< userData.length; i++) {
        var list = document.createElement("li");
        list.innerHTML = userData[i].initials + ", your score is " + userData[i].score
        scores.appendChild(list)
    }
}

    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    goBack.className = "btn go-back-clear";
    console.log(goBack)
    highScoreButtonsWrapper.appendChild(goBack);
    goBack.addEventListener("click", function() {
        location.reload();
    })

    var clear = document.createElement("button");
    clear.textContent = "Clear high scores";
    clear.className = "btn go-back-clear";
    highScoreButtonsWrapper.appendChild(clear);
    clear.addEventListener("click", function() {
        localStorage.clear();
        location.reload();
    })
})