var startBtn = document.getElementById("start")
var welcome = document.getElementById("welcome")

var quiz = document.getElementById("quiz")
var question = document.getElementById("question")
var answers = document.getElementById("answers")

var score = 0;
var qIndex = 0;

var qAndA = [
    {
        question: "what color is the sky?",
        choices: ["A. Red", "B. Green", "C. Blue", "D. Purple"],
        correct: "C. Blue"
    },
    {
        question: "what is the color of grass?",
        choices: ["A. Red", "B. Green", "C. Blue", "D. Purple"],
        correct: "B. Green"
    }
]


quiz.style.dislpay = "none"

startBtn.addEventListener("click", function () {
    welcome.style.display = "none"
    quiz.style.display = "block"
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
            var decision = document.createElement("p")
            quiz.append(decision)
            if (choice.textContent === qAndA[qIndex].correct) {
                score = score + 10
                decision.innerHTML = "Correct!"
            } else {
                score = score - 10
                decision.innerHTML = "Wrong!"
            } if (score <= 0) {
                score = 0
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
    var header = document.createElement("h1")
    header.innerHTML = "Quiz Over! You got a score of: " + score
    quiz.append(header)
    var input = document.createElement("input")
    input.type = "text";
    input.placeholder = "Initials.."
    quiz.append(input)
    var submit = document.createElement("button")
    submit.innerHTML = "Submit"
    quiz.append(submit)
    submit.addEventListener("click", function() {
        var initials = input.value;
        if(initials === "") {
            alert("Please Enter Your Initials!")
        } else {
            var userScore = {initials: initials, score: score}
            localStorage.setItem("userInfo", JSON.stringify(userScore))
        }
        var scores = document.createElement("ul")
        quiz.append(scores)
        var list = document.createElement("li")
        list.innerHTML = "Hello!"
        scores.appendChild(list)
    })
}   
