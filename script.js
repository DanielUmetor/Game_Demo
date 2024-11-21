const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
        answer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        answer: "Au"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('time');
const timerContainer = document.getElementById('timer');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    nextButton.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    timerContainer.classList.remove('hidden');
    timer = setInterval(updateTimer, 1000);
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.addEventListener('click', selectOption);
        optionsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectOption(event) {
    const selectedOption = event.target;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption.innerText === correctAnswer) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
    }

    // Highlight the correct answer in green
    Array.from(optionsElement.children).forEach(button => {
        if (button.innerText === correctAnswer) {
            button.classList.add('correct-answer');
        } else {
            button.disabled = true;
        }
    });

    nextButton.classList.remove('hidden');
    clearInterval(timer);
}

function updateTimer() {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        loadNextQuestion();
    }
}

nextButton.addEventListener('click', loadNextQuestion);

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 30;
        loadQuestion();
        timer = setInterval(updateTimer, 1000);
    } else {
        showScore();
    }
}

function showScore() {
    scoreElement.innerText = score;
    scoreContainer.classList.remove('hidden');
    timerContainer.classList.add('hidden');
}

restartButton.addEventListener('click', startQuiz);

// Start the quiz on page load
startQuiz();
