/* Result.js - scores the submitted test and renders the review page */

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function showResults() {
    var rawResult = sessionStorage.getItem("quizResult");

    if (!rawResult) {
        window.location.href = "Index.html";
        return;
    }

    var data = JSON.parse(rawResult);
    var questions = data.questions;
    var answers = data.answers;

    var timeTaken = data.timeTaken || 0;
    var minsTaken = Math.floor(timeTaken / 60);
    var secsTaken = timeTaken % 60;

    var score = 0;
    var reviewHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var qObj = questions[i];
        var userAnsIndex = answers[i];
        var correctAnsIndex = qObj.ans;
        var correctAnsText = qObj.options[correctAnsIndex];

        var cardClass = "review-card";
        var statusText = "Unattempted";
        var userAnsText = "Not Answered";

        if (userAnsIndex !== -1 && userAnsIndex !== undefined && qObj.options[userAnsIndex] !== undefined) {
            userAnsText = qObj.options[userAnsIndex];
            if (userAnsIndex === correctAnsIndex) {
                score++;
                cardClass += " correct";
                statusText = "Correct";
            } else {
                cardClass += " incorrect";
                statusText = "Incorrect";
            }
        }

        reviewHTML +=
            "<div class='" + cardClass + "'>" +
            "<p><strong>Q" + (i + 1) + ": " + escapeHTML(qObj.q) + "</strong></p>" +
            "<p>Your Answer: " + escapeHTML(userAnsText) + " | <strong>Status: " + statusText + "</strong></p>" +
            "<p style='color: #15803d; font-weight: bold;'>Correct Answer: " + escapeHTML(correctAnsText) + "</p>" +
            "</div>";
    }

    var accuracy = Math.round((score / questions.length) * 100);
    var grade = "Needs Practice";
    if (accuracy >= 80) {
        grade = "Excellent";
    } else if (accuracy >= 50) {
        grade = "Good";
    }

    document.getElementById("resultCandidateInfo").innerHTML =
        "Candidate: " + escapeHTML(data.name) + " | ID: " + escapeHTML(data.id) + " | Topic: " + escapeHTML(data.topic);
    document.getElementById("totalScoreDisplay").innerHTML = score + " / " + questions.length;
    document.getElementById("accuracyDisplay").innerHTML = accuracy + "%";
    document.getElementById("timeTakenDisplay").innerHTML = minsTaken + "m " + secsTaken + "s";
    document.getElementById("gradeDisplay").innerHTML = grade;
    document.getElementById("reviewContainer").innerHTML = reviewHTML;
}

function restartPortal() {
    sessionStorage.removeItem("quizResult");
    sessionStorage.removeItem("quizConfig");
    window.location.href = "Index.html";
}

// Result.html loads this script at the end of the body, so the page is ready here
if (document.getElementById("resultSection")) {
    showResults();
}
