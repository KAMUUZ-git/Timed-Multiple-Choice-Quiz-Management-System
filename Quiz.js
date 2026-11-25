/* Quiz.js - question bank, quiz flow, timer and navigation */

var selectedTopic = "";
var candidateName = "";
var candidateId = "";

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

var quizBank = {
    "General Aptitude": [
        { q: "What is the next number in the series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "36"], ans: 1 },
        { q: "If a train 100m long crosses a pole in 5 seconds, what is its speed?", options: ["20 m/s", "25 m/s", "15 m/s", "50 m/s"], ans: 0 },
        { q: "Find 25% of 480.", options: ["100", "140", "120", "110"], ans: 2 },
        { q: "An item bought for Rs. 40 is sold for Rs. 50. Find the profit percentage.", options: ["20%", "25%", "10%", "15%"], ans: 1 },
        { q: "What is the average of the first 5 natural numbers?", options: ["2.5", "3", "3.5", "4"], ans: 1 },
        { q: "If A = 1, B = 2, C = 3, what is the sum of letter values in 'CAT'?", options: ["24", "27", "21", "20"], ans: 0 },
        { q: "How many seconds are there in 1.5 hours?", options: ["3600", "4500", "5400", "7200"], ans: 2 },
        { q: "Which of the following is a prime number?", options: ["21", "27", "29", "33"], ans: 2 },
        { q: "If 5 workers complete a task in 12 days, how many days will 10 workers take at the same rate?", options: ["24 days", "6 days", "8 days", "10 days"], ans: 1 },
        { q: "Find the odd one out: 8, 27, 64, 100, 125.", options: ["27", "64", "100", "125"], ans: 2 }
    ],
    "Basic C Programming": [
        { q: "Which symbol is used to terminate a statement in C?", options: [":", ";", ".", ","], ans: 1 },
        { q: "Which header file is required for printf() and scanf()?", options: ["stdlib.h", "math.h", "stdio.h", "string.h"], ans: 2 },
        { q: "Which format specifier is used to print an integer in C?", options: ["%f", "%c", "%d", "%s"], ans: 2 },
        { q: "Which data type stores a single character in C?", options: ["int", "char", "float", "double"], ans: 1 },
        { q: "How many iterations does 'for(i=0; i<5; i++)' run?", options: ["4", "5", "6", "Infinite"], ans: 1 },
        { q: "Which operator gives the memory address of a variable in C?", options: ["*", "&", "#", "@"], ans: 1 },
        { q: "Array indexing in C starts at which index?", options: ["1", "-1", "0", "2"], ans: 2 },
        { q: "Which keyword exits a loop immediately in C?", options: ["stop", "exit", "break", "return"], ans: 2 },
        { q: "What is the typical size of a 'char' data type in C?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], ans: 0 },
        { q: "Which function serves as the starting point of a C program?", options: ["start()", "program()", "main()", "init()"], ans: 2 }
    ],
    "Computer Fundamentals": [
        { q: "Which component is commonly referred to as the brain of the computer?", options: ["RAM", "Hard Disk", "CPU", "Monitor"], ans: 2 },
        { q: "1 Kilobyte (KB) is equal to how many bytes in binary measurement?", options: ["1000 bytes", "1024 bytes", "512 bytes", "2048 bytes"], ans: 1 },
        { q: "Which of the following is volatile memory?", options: ["ROM", "SSD", "RAM", "Optical Disc"], ans: 2 },
        { q: "What does ALU stand for?", options: ["Arithmetic Logic Unit", "Array Logic Unit", "Advanced Local Unit", "Automatic Load Unit"], ans: 0 },
        { q: "Which number system uses base 2?", options: ["Decimal", "Octal", "Hexadecimal", "Binary"], ans: 3 },
        { q: "Which of the following is an operating system?", options: ["Browser", "Linux", "Text Editor", "Compiler"], ans: 1 },
        { q: "Which device is strictly an output device?", options: ["Keyboard", "Scanner", "Printer", "Mouse"], ans: 2 },
        { q: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Radio Link", "Unified Record List", "User Remote Login"], ans: 0 },
        { q: "Which memory typically holds non-volatile firmware instructions?", options: ["Cache", "RAM", "ROM", "Register"], ans: 2 },
        { q: "What is the binary representation of decimal 5?", options: ["100", "101", "110", "111"], ans: 1 }
    ],
    "Web Basics": [
        { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management", "Home Tool Markup Language"], ans: 0 },
        { q: "Which HTML tag represents the highest-level heading?", options: ["<h6>", "<head>", "<h1>", "<header>"], ans: 2 },
        { q: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "bgcolor"], ans: 2 },
        { q: "Which HTML tag embeds an image?", options: ["<image>", "<img>", "<pic>", "<src>"], ans: 1 },
        { q: "Which HTML tag contains client-side JavaScript code?", options: ["<js>", "<javascript>", "<script>", "<code>"], ans: 2 },
        { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Screen Styling", "Colorful Style Syntax"], ans: 0 },
        { q: "Which attribute specifies the destination URL in an <a> tag?", options: ["src", "link", "href", "url"], ans: 2 },
        { q: "Which DOM method returns an element matching a given ID?", options: ["getElementById()", "queryId()", "selectId()", "findElement()"], ans: 0 },
        { q: "Which HTML tag inserts a line break?", options: ["<lb>", "<break>", "<br>", "<hr>"], ans: 2 },
        { q: "Which CSS property controls space inside an element's border?", options: ["margin", "padding", "spacing", "border-gap"], ans: 1 }
    ]
};

var currentQuestions = [];
var currentIndex = 0;
var userAnswers = [];
var markedForReview = [];
var totalSeconds = 300;
var remainingSeconds = 300;
var timerInterval = null;

function initQuiz() {
    var rawConfig = sessionStorage.getItem("quizConfig");
    if (!rawConfig) {
        window.location.href = "Index.html";
        return;
    }

    var config = JSON.parse(rawConfig);
    selectedTopic = config.topic;
    candidateName = config.name;
    candidateId = config.id;

    currentQuestions = quizBank[selectedTopic];
    if (!currentQuestions) {
        window.location.href = "Index.html";
        return;
    }

    currentIndex = 0;
    userAnswers = [];
    markedForReview = [];
    for (var i = 0; i < currentQuestions.length; i++) {
        userAnswers.push(-1);
        markedForReview.push(false);
    }
    remainingSeconds = totalSeconds;

    document.getElementById("displayTopic").innerHTML = "Topic: " + escapeHTML(selectedTopic);
    document.getElementById("displayCandidate").innerHTML = "Candidate: " + escapeHTML(candidateName) + " (" + escapeHTML(candidateId) + ")";

    renderPalette();
    loadQuestion(0);
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    updateTimerText();
    timerInterval = setInterval(function () {
        remainingSeconds--;
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            updateTimerText();
            clearInterval(timerInterval);
            submitQuiz();
            return;
        }
        updateTimerText();
    }, 1000);
}

function updateTimerText() {
    var mins = Math.floor(remainingSeconds / 60);
    var secs = remainingSeconds % 60;
    var formatted = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    document.getElementById("timerDisplay").innerHTML = formatted;
}

function loadQuestion(index) {
    currentIndex = index;
    var qObj = currentQuestions[currentIndex];

    document.getElementById("progressCounter").innerHTML = "Question " + (currentIndex + 1) + " of " + currentQuestions.length;
    document.getElementById("questionText").innerHTML = "Q" + (currentIndex + 1) + ". " + escapeHTML(qObj.q);

    var optionsHTML = "";
    for (var i = 0; i < qObj.options.length; i++) {
        var checkedAttr = (userAnswers[currentIndex] === i) ? "checked" : "";
        optionsHTML +=
            "<label class='option-item'>" +
            "<input type='radio' name='quizOption' value='" + i + "' " + checkedAttr + " onclick='saveAnswer(" + i + ")'> " +
            escapeHTML(qObj.options[i]) +
            "</label>";
    }

    document.getElementById("optionsContainer").innerHTML = optionsHTML;
    renderPalette();
}

function saveAnswer(optionIndex) {
    userAnswers[currentIndex] = optionIndex;
    renderPalette();
}

function clearResponse() {
    userAnswers[currentIndex] = -1;
    loadQuestion(currentIndex);
}

function toggleMarkReview() {
    markedForReview[currentIndex] = !markedForReview[currentIndex];
    renderPalette();
}

function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
        loadQuestion(currentIndex + 1);
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        loadQuestion(currentIndex - 1);
    }
}

function renderPalette() {
    var paletteHTML = "";
    for (var i = 0; i < currentQuestions.length; i++) {
        var btnClass = "palette-btn";
        if (markedForReview[i]) {
            btnClass += " review";
        } else if (userAnswers[i] !== -1) {
            btnClass += " answered";
        }
        if (i === currentIndex) {
            btnClass += " current";
        }
        paletteHTML += "<button type='button' class='" + btnClass + "' onclick='loadQuestion(" + i + ")'>" + (i + 1) + "</button>";
    }
    document.getElementById("paletteContainer").innerHTML = paletteHTML;
}

function submitQuiz() {
    clearInterval(timerInterval);

    var timeTaken = totalSeconds - remainingSeconds;

    // Save the test sheet so Result.html can score and review it
    sessionStorage.setItem("quizResult", JSON.stringify({
        name: candidateName,
        id: candidateId,
        topic: selectedTopic,
        timeTaken: timeTaken,
        totalSeconds: totalSeconds,
        questions: currentQuestions,
        answers: userAnswers
    }));

    window.location.href = "Result.html";
}

// Quiz.html loads this script at the end of the body, so the page is ready here
if (document.getElementById("quizSection")) {
    initQuiz();
}
