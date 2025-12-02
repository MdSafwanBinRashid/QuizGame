// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "If you could save either a famous artwork or a stranger's life, which would you choose?",
    answers: [
      { text: "The artwork - it could inspire millions", correct: false },
      { text: "The stranger - human life is priceless", correct: true },
      { text: "Whichever would cause less media attention", correct: false },
      { text: "I couldn't decide until the moment came", correct: false },
    ],
  },
  {
    question: "Which desire is most fundamental to human existence?",
    answers: [
      { text: "The pursuit of knowledge", correct: false },
      { text: "The need for connection", correct: true },
      { text: "The drive for power", correct: false },
      { text: "The search for meaning", correct: false },
    ],
  },
  {
    question: "What defines a person more: their memories or their actions?",
    answers: [
      { text: "Memories shape who we become", correct: false },
      { text: "Actions speak louder than thoughts", correct: true },
      { text: "Neither - we are constantly changing", correct: false },
      { text: "Both are illusions of a continuous self", correct: false },
    ],
  },
  {
    question: "Is true altruism possible?",
    answers: [
      { text: "Yes - some acts have no self-benefit", correct: false },
      { text: "No - all actions serve some self-interest", correct: true },
      { text: "Only in moments of extreme crisis", correct: false },
      { text: "It depends on one's definition of 'self'", correct: false },
    ],
  },
  {
    question: "What is the most dangerous human invention?",
    answers: [
      { text: "Nuclear weapons", correct: false },
      { text: "Social media algorithms", correct: false },
      { text: "The concept of 'us vs them'", correct: true },
      { text: "Artificial intelligence", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "You see through the illusions. Rare clarity.";
  } else if (percentage >= 80) {
    resultMessage.textContent = "You question deeply. Truth is your companion.";
  } else if (percentage >= 60) {
    resultMessage.textContent = "You perceive shadows of truth. Keep seeking.";
  } else if (percentage >= 40) {
    resultMessage.textContent = "The fog is thick. Your journey begins.";
  } else {
    resultMessage.textContent = "In darkness, questions whisper. Listen closer.";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}