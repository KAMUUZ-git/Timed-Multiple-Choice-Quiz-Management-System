/* =====================================================================
   MODULE 2 : QUESTION BANK, QUIZ ENGINE, TIMER & NAVIGATION PALETTE
   ---------------------------------------------------------------------
   File        : quiz.js
   Module owner: Kamlesh Chandra Mangaraj
   Team        : THE CODE TITANS  (LPU)
   ---------------------------------------------------------------------
   HOW THIS FILE WORKS (easy viva explanation):
   1. QUESTION_BANK  -> a JavaScript object holding 10 MCQs for each topic.
   2. quizState      -> an object that remembers the current question index,
                        the answers the student picked, which questions are
                        marked for review, and the remaining time.
   3. localStorage   -> index.html (Module 1) already saved quizTopic,
                        studentName and studentReg. We READ them here.
                        When the student submits, we WRITE quizResultsData,
                        which result.html (Module 3) will read and evaluate.
   4. Timer          -> setInterval() runs a function every 1000 ms (1 second).
   ===================================================================== */


/* =====================================================================
   1. QUESTION BANK
   ---------------------------------------------------------------------
   Every topic has an array of 10 question objects.
   Each question object has:
     question     -> the text of the question
     options      -> exactly 4 choices (index 0, 1, 2, 3)
     correctAnswer-> the INDEX of the right option (0 to 3)
   ===================================================================== */
const QUESTION_BANK = {

  /* ---------------------- TOPIC 1: GENERAL APTITUDE ---------------------- */
  "General Aptitude": [
    {
      question: "What is 15% of 200?",
      options: ["20", "30", "25", "35"],
      correctAnswer: 1
    },
    {
      question: "Find the average of 5, 10, 15, 20 and 25.",
      options: ["10", "15", "20", "25"],
      correctAnswer: 1
    },
    {
      question: "Complete the series: 2, 4, 8, 16, ?",
      options: ["24", "30", "32", "36"],
      correctAnswer: 2
    },
    {
      question: "A train covers 120 km in 2 hours. What is its speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correctAnswer: 1
    },
    {
      question: "Two numbers are in the ratio 3 : 5 and their sum is 40. What is the smaller number?",
      options: ["12", "15", "20", "25"],
      correctAnswer: 1
    },
    {
      question: "What is the simple interest on Rs. 1000 at 5% per year for 2 years?",
      options: ["Rs. 50", "Rs. 75", "Rs. 100", "Rs. 150"],
      correctAnswer: 2
    },
    {
      question: "Which of these fractions is the largest?",
      options: ["1/2", "2/3", "3/5", "4/7"],
      correctAnswer: 1
    },
    {
      question: "Complete the letter series: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      correctAnswer: 1
    },
    {
      question: "25% of a number is 50. What is the number?",
      options: ["100", "150", "200", "250"],
      correctAnswer: 2
    },
    {
      question: "An item is bought for Rs. 400 and sold for Rs. 500. What is the profit percentage?",
      options: ["10%", "20%", "25%", "30%"],
      correctAnswer: 2
    }
  ],

  /* ------------------- TOPIC 2: BASIC C PROGRAMMING ------------------- */
  "Basic C Programming": [
    {
      question: "Which header file is needed for printf() and scanf()?",
      options: ["<conio.h>", "<stdio.h>", "<math.h>", "<string.h>"],
      correctAnswer: 1
    },
    {
      question: "Which format specifier is used to print an integer in C?",
      options: ["%f", "%c", "%d", "%s"],
      correctAnswer: 2
    },
    {
      question: "Which of these is a correct variable declaration in C?",
      options: ["int a = 5;", "a int = 5;", "int = a 5;", "declare a = 5;"],
      correctAnswer: 0
    },
    {
      question: "Which loop is guaranteed to run at least once?",
      options: ["for loop", "while loop", "do-while loop", "if statement"],
      correctAnswer: 2
    },
    {
      question: "On most systems, how many bytes does an int variable take?",
      options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
      correctAnswer: 2
    },
    {
      question: "Which operator gives the memory address of a variable?",
      options: ["*", "&", "#", "@"],
      correctAnswer: 1
    },
    {
      question: "Which keyword is used to declare a value that cannot be changed?",
      options: ["static", "const", "final", "fixed"],
      correctAnswer: 1
    },
    {
      question: "In C, the index of the first element of an array is:",
      options: ["0", "1", "-1", "Depends on the array size"],
      correctAnswer: 0
    },
    {
      question: "Which return type is used for a function that returns nothing?",
      options: ["int", "null", "void", "empty"],
      correctAnswer: 2
    },
    {
      question: "Which escape sequence moves the cursor to a new line?",
      options: ["\\t", "\\n", "\\b", "\\0"],
      correctAnswer: 1
    }
  ],

  /* ------------------ TOPIC 3: COMPUTER FUNDAMENTALS ------------------ */
  "Computer Fundamentals": [
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Power Unit",
        "Central Program Utility",
        "Control Processing Unit"
      ],
      correctAnswer: 0
    },
    {
      question: "Which of these is a primary (main) memory?",
      options: ["Hard disk", "RAM", "Pen drive", "DVD"],
      correctAnswer: 1
    },
    {
      question: "1 Kilobyte (KB) is equal to how many bytes?",
      options: ["1000 bytes", "1024 bytes", "512 bytes", "2048 bytes"],
      correctAnswer: 1
    },
    {
      question: "Which part of the computer is called its 'brain'?",
      options: ["RAM", "Monitor", "CPU", "Keyboard"],
      correctAnswer: 2
    },
    {
      question: "Which of these is an input device?",
      options: ["Printer", "Monitor", "Keyboard", "Speaker"],
      correctAnswer: 2
    },
    {
      question: "What is the binary form of the decimal number 5?",
      options: ["100", "101", "110", "111"],
      correctAnswer: 1
    },
    {
      question: "Which of these is an operating system?",
      options: ["Windows", "MS Word", "Google Chrome", "Photoshop"],
      correctAnswer: 0
    },
    {
      question: "ROM stands for:",
      options: [
        "Random Output Memory",
        "Read Only Memory",
        "Read Output Machine",
        "Rapid Online Memory"
      ],
      correctAnswer: 1
    },
    {
      question: "Which storage device keeps data even after the computer is switched off?",
      options: ["RAM", "Cache", "Hard disk", "CPU register"],
      correctAnswer: 2
    },
    {
      question: "What does GUI stand for?",
      options: [
        "General User Input",
        "Graphical User Interface",
        "Graphic Utility Internet",
        "Guided User Instruction"
      ],
      correctAnswer: 1
    }
  ],

  /* ------------------------ TOPIC 4: WEB BASICS ------------------------ */
  "Web Basics": [
    {
      question: "HTML stands for:",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "HyperTool Markup Language",
        "Home Text Markup Language"
      ],
      correctAnswer: 0
    },
    {
      question: "Which tag is used for the largest heading in HTML?",
      options: ["<head>", "<h6>", "<h1>", "<title>"],
      correctAnswer: 2
    },
    {
      question: "What is CSS mainly used for?",
      options: [
        "Storing data in a database",
        "Styling the look of a web page",
        "Writing server-side logic",
        "Compressing images"
      ],
      correctAnswer: 1
    },
    {
      question: "Which attribute of the <img> tag gives the image file path?",
      options: ["href", "link", "src", "path"],
      correctAnswer: 2
    },
    {
      question: "Which tag inserts a line break in HTML?",
      options: ["<lb>", "<br>", "<break>", "<newline>"],
      correctAnswer: 1
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1
    },
    {
      question: "Where does JavaScript code normally run?",
      options: [
        "Only on the web server",
        "Inside the web browser",
        "Only in a database",
        "Only in CSS files"
      ],
      correctAnswer: 1
    },
    {
      question: "Which is the correct way to write a comment in HTML?",
      options: [
        "// this is a comment",
        "<!-- this is a comment -->",
        "/* this is a comment */",
        "# this is a comment"
      ],
      correctAnswer: 1
    },
    {
      question: "Which tag creates a numbered (ordered) list?",
      options: ["<ul>", "<ol>", "<li>", "<dl>"],
      correctAnswer: 1
    },
    {
      question: "What does the <ul> tag create?",
      options: [
        "An unordered (bulleted) list",
        "An underlined link",
        "A user login form",
        "An upload button"
      ],
      correctAnswer: 0
    }
  ]
};


/* =====================================================================
   2. CONSTANTS  (values that never change while the quiz is running)
   ===================================================================== */
const TOTAL_TIME_SECONDS = 10 * 60; // 10 minutes = 600 seconds
const TOTAL_QUESTIONS = 10;         // every topic has 10 questions

/* =====================================================================
   3. QUIZ STATE  (the "memory" of the quiz while the page is open)
   ===================================================================== */
const quizState = {
  topic: "",               // topic name chosen on index.html
  questions: [],           // the 10 questions of that topic
  currentIndex: 0,         // which question is showing now (starts at 0 = Q1)
  userAnswers: [],         // userAnswers[i] = option index picked, or null
  markedForReview: [],     // markedForReview[i] = true / false
  timeLeft: TOTAL_TIME_SECONDS
};

/* We keep the timer id here so we can stop it with clearInterval() later. */
let timerId = null;


/* =====================================================================
   4. GRABBING HTML ELEMENTS  (so we can update them from JavaScript)
   ===================================================================== */
const topicNameEl      = document.getElementById("topicName");
const studentNameEl    = document.getElementById("studentName");
const studentRegEl     = document.getElementById("studentReg");
const timerBadgeEl     = document.getElementById("timerBadge");
const progressCounterEl= document.getElementById("progressCounter");
const questionNumberEl = document.getElementById("questionNumber");
const questionTextEl   = document.getElementById("questionText");
const optionsListEl    = document.getElementById("optionsList");
const paletteGridEl    = document.getElementById("paletteGrid");
const prevBtn          = document.getElementById("prevBtn");
const nextBtn          = document.getElementById("nextBtn");
const markBtn          = document.getElementById("markBtn");
const clearBtn         = document.getElementById("clearBtn");
const submitBtn        = document.getElementById("submitBtn");


/* =====================================================================
   5. START-UP FUNCTION
   ---------------------------------------------------------------------
   Runs once when quiz.js loads. It:
     a) reads the student details + topic saved by index.html
     b) checks that the topic is valid
     c) fills the arrays, draws the page, and starts the timer
   ===================================================================== */
function startQuiz() {

  /* ---- Step 1: read values saved by Module 1 (index.html) ---- */
  const topic       = localStorage.getItem("quizTopic");
  const studentName = localStorage.getItem("studentName");
  const studentReg  = localStorage.getItem("studentReg");

  /* ---- Step 2: if the student skipped the home page, send them back ---- */
  if (!topic || !studentName || !studentReg) {
    alert("Please fill your details and choose a topic on the home page first.");
    window.location.href = "index.html";
    return; // stop running this function
  }

  /* ---- Step 3: make sure the topic really exists in our question bank ---- */
  if (!QUESTION_BANK[topic]) {
    alert("The selected topic was not found. Please choose a topic again.");
    window.location.href = "index.html";
    return;
  }

  /* ---- Step 4: copy the correct 10 questions into the state ---- */
  quizState.topic     = topic;
  quizState.questions = QUESTION_BANK[topic];

  /* ---- Step 5: empty answer + review arrays, one slot per question ----
     Array(10).fill(null)  -> [null, null, ... 10 times]
     Array(10).fill(false) -> [false, false, ... 10 times]                */
  quizState.userAnswers     = Array(quizState.questions.length).fill(null);
  quizState.markedForReview = Array(quizState.questions.length).fill(false);

  /* ---- Step 6: show the student details in the top bar ---- */
  topicNameEl.textContent    = quizState.topic;
  studentNameEl.textContent  = studentName;
  studentRegEl.textContent   = studentReg;

  /* ---- Step 7: build the palette buttons once, then draw the quiz ---- */
  createPaletteButtons();
  renderQuestion();
  updateTimerDisplay();

  /* ---- Step 8: start the countdown ---- */
  startTimer();
}


/* =====================================================================
   6. TIMER FUNCTIONS
   ---------------------------------------------------------------------
   setInterval(function, 1000) calls the function every 1 second.
   Each call we reduce timeLeft by 1 and redraw the badge.
   When timeLeft reaches 0 we auto-submit the quiz.
   ===================================================================== */
function startTimer() {
  timerId = setInterval(function () {
    quizState.timeLeft = quizState.timeLeft - 1; // one second passed

    updateTimerDisplay();

    if (quizState.timeLeft <= 0) {
      clearInterval(timerId);       // stop the clock
      quizState.timeLeft = 0;       // never show negative time
      alert("Time is up! Your quiz will be submitted automatically.");
      submitQuiz(true);             // true = automatic submit, skip confirmation
    }
  }, 1000);
}

/* Converts seconds into "MM:SS" text and shows it in the timer badge. */
function updateTimerDisplay() {
  const minutes = Math.floor(quizState.timeLeft / 60); // whole minutes
  const seconds = quizState.timeLeft % 60;             // leftover seconds

  /* padStart(2, "0") adds a leading zero: 5 -> "05" */
  const text = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  timerBadgeEl.textContent = text;

  /* Optional visual warning in the last 60 seconds (handled by style.css) */
  if (quizState.timeLeft <= 60) {
    timerBadgeEl.classList.add("timer-low");
  } else {
    timerBadgeEl.classList.remove("timer-low");
  }
}


/* =====================================================================
   7. RENDERING THE QUESTION  (DOM manipulation)
   ===================================================================== */
function renderQuestion() {
  const index    = quizState.currentIndex;
  const question = quizState.questions[index];

  /* ---- Progress counter: "Question 1 of 10" ---- */
  progressCounterEl.textContent =
    "Question " + (index + 1) + " of " + quizState.questions.length;

  /* ---- Question number + text ---- */
  questionNumberEl.textContent = "Q" + (index + 1) + ".";
  questionTextEl.textContent   = question.question;

  /* ---- Build the 4 option buttons from scratch ---- */
  optionsListEl.innerHTML = ""; // clear old options first

  /* forEach gives us the option text AND its position (optionIndex) */
  question.options.forEach(function (optionText, optionIndex) {

    /* Create a button for this option */
    const optionBtn = document.createElement("button");
    optionBtn.type = "button";
    optionBtn.className = "option-item";
    optionBtn.textContent = optionText;

    /* If the student already picked this option, highlight it */
    if (quizState.userAnswers[index] === optionIndex) {
      optionBtn.classList.add("selected");
    }

    /* When clicked, save the answer and redraw the palette colours */
    optionBtn.addEventListener("click", function () {
      selectOption(optionIndex);
    });

    /* Add the button to the page */
    optionsListEl.appendChild(optionBtn);
  });

  /* ---- Disable "Previous" on the first question ---- */
  prevBtn.disabled = (index === 0);

  /* ---- On the last question, "Next" changes label to help the student ---- */
  if (index === quizState.questions.length - 1) {
    nextBtn.textContent = "Last Question";
    nextBtn.disabled = true;
  } else {
    nextBtn.textContent = "Next";
    nextBtn.disabled = false;
  }

  /* ---- Mark for Review button reflects the saved state ---- */
  if (quizState.markedForReview[index]) {
    markBtn.textContent = "Unmark Review";
    markBtn.classList.add("active");
  } else {
    markBtn.textContent = "Mark for Review";
    markBtn.classList.remove("active");
  }

  /* ---- Keep the palette colours in sync ---- */
  updatePalette();
}

/* Saves the chosen option for the current question. */
function selectOption(optionIndex) {
  quizState.userAnswers[quizState.currentIndex] = optionIndex;
  renderQuestion(); // redraw so the highlight + palette update
}


/* =====================================================================
   8. QUESTION NAVIGATION PALETTE
   ===================================================================== */
function createPaletteButtons() {
  paletteGridEl.innerHTML = ""; // clear first (in case of redraw)

  /* Create one button per question: 1, 2, 3 ... 10 */
  quizState.questions.forEach(function (question, index) {

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "palette-btn";
    btn.textContent = index + 1;

    /* Clicking a number jumps straight to that question */
    btn.addEventListener("click", function () {
      quizState.currentIndex = index;
      renderQuestion();
    });

    paletteGridEl.appendChild(btn);
  });
}

/* Colours every palette button according to its status. */
function updatePalette() {
  /* children gives us all the palette buttons in order 1..10 */
  const buttons = paletteGridEl.children;

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];

    /* Remove all status classes, then add the correct one */
    btn.classList.remove("answered", "marked", "unvisited", "current");

    if (quizState.markedForReview[i]) {
      /* Purple / amber -> marked for review (highest priority) */
      btn.classList.add("marked");
    } else if (quizState.userAnswers[i] !== null) {
      /* Green -> answered */
      btn.classList.add("answered");
    } else {
      /* Grey -> not answered */
      btn.classList.add("unvisited");
    }

    /* Ring around the question we are currently viewing */
    if (i === quizState.currentIndex) {
      btn.classList.add("current");
    }
  }
}


/* =====================================================================
   9. BUTTON ACTIONS  (Previous, Next, Mark, Clear, Submit)
   ===================================================================== */

/* --- Previous question --- */
prevBtn.addEventListener("click", function () {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex = quizState.currentIndex - 1;
    renderQuestion();
  }
});

/* --- Next question --- */
nextBtn.addEventListener("click", function () {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex = quizState.currentIndex + 1;
    renderQuestion();
  }
});

/* --- Mark / unmark the current question for review --- */
markBtn.addEventListener("click", function () {
  const i = quizState.currentIndex;
  /* ! flips true to false and false to true */
  quizState.markedForReview[i] = !quizState.markedForReview[i];
  renderQuestion();
});

/* --- Clear the selected option of the current question --- */
clearBtn.addEventListener("click", function () {
  quizState.userAnswers[quizState.currentIndex] = null;
  renderQuestion();
});

/* --- Submit button: ask for confirmation, then submit --- */
submitBtn.addEventListener("click", function () {
  const answeredCount = quizState.userAnswers.filter(function (answer) {
    return answer !== null;
  }).length;

  const confirmSubmit = confirm(
    "You have answered " + answeredCount + " of " + quizState.questions.length +
    " questions.\n\nDo you want to submit the quiz now?"
  );

  if (confirmSubmit) {
    submitQuiz(false);
  }
});


/* =====================================================================
   10. SUBMIT FUNCTION
   ---------------------------------------------------------------------
   Saves everything result.html (Module 3) needs into localStorage under
   the key "quizResultsData", then moves to result.html.
   ===================================================================== */
function submitQuiz(isAutoSubmit) {

  /* Stop the timer so it cannot keep counting after submission */
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  /* Time taken = total time allowed minus time left */
  const timeTakenSeconds = TOTAL_TIME_SECONDS - quizState.timeLeft;

  /* Build the result object. These field names must match what
     result.js (Module 3) expects to read. */
  const quizResultsData = {
    studentName: localStorage.getItem("studentName"),
    studentReg: localStorage.getItem("studentReg"),
    quizTopic: quizState.topic,
    questions: quizState.questions,
    userAnswers: quizState.userAnswers,
    timeTakenSeconds: timeTakenSeconds
  };

  /* localStorage can only store TEXT, so we convert the object to a
     JSON string first. result.js will use JSON.parse() to convert back. */
  localStorage.setItem("quizResultsData", JSON.stringify(quizResultsData));

  /* Small feedback message (skipped when the timer auto-submits) */
  if (!isAutoSubmit) {
    alert("Quiz submitted successfully! Opening your result...");
  }

  /* Go to the scorecard page */
  window.location.href = "result.html";
}


/* =====================================================================
   11. RUN THE QUIZ
   This is the very last line: it calls startQuiz() once the page is ready.
   ===================================================================== */
startQuiz();
