// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "African Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Dinosaur", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent Van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Michelangelo", correct: false }
        ]
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Process Utility", correct: false },
            { text: "Central Processor Undertaking", correct: false }
        ]
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "C", correct: true },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What data structure operates on a Last-In-First-Out principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Linked List", correct: false },
            { text: "Binary Tree", correct: false }
        ]
    },
    {
        question: "Which of these is NOT a JavaScript framework or library?",
        answers: [
            { text: "React", correct: false },
            { text: "Angular", correct: false },
            { text: "Django", correct: true },
            { text: "Vue", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyper Text Machine Language", correct: false }
        ]
    }
];

// DOM elements
const questionElement = document.getElementById("question");
const questionContainer = document.getElementById("question-container");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const quizContainer = document.querySelector(".quiz-container");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Fisher-Yates (Knuth) Shuffle algorithm to randomize questions
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex != 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Initialize quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    // Shuffle the questions
    shuffledQuestions = shuffleArray([...questions]);
    nextButton.innerHTML = "Next";
    scoreContainer.classList.add("hide");
    scoreContainer.classList.remove("show");
    showQuestion();
}

// Display question with animation
function showQuestion() {
    resetState();
    questionContainer.classList.remove("fade-out");
    questionContainer.classList.add("fade-in");

    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Change background color subtly based on question number
    const hue = 220 + (currentQuestionIndex * 15) % 40;
    document.body.style.backgroundImage = `linear-gradient(135deg, #f5f7fa 0%, hsl(${hue}, 40%, 80%) 100%)`;

    // Animate answer buttons appearing one by one
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.style.opacity = "0";
        button.style.transform = "translateY(20px)";

        setTimeout(() => {
            button.style.transition = "all 0.3s ease";
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
        }, 100 * (index + 1));

        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Reset question state
function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
        quizContainer.classList.add("correct-answer");
        setTimeout(() => {
            quizContainer.classList.remove("correct-answer");
        }, 800);
    } else {
        selectedButton.classList.add("wrong");
    }

    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.style.opacity = "0";
    nextButton.style.transform = "translateY(20px)";

    setTimeout(() => {
        nextButton.style.opacity = "1";
        nextButton.style.transform = "translateY(0)";
    }, 300);
}

// Show final score
function showScore() {
    questionContainer.classList.add("fade-out");

    setTimeout(() => {
        resetState();
        questionElement.innerHTML = "Quiz completed!";
        scoreElement.innerHTML = score + " out of " + shuffledQuestions.length;

        nextButton.style.display = "none";
        scoreContainer.classList.remove("hide");

        // Add a slight delay before showing the score with animation
        setTimeout(() => {
            scoreContainer.classList.add("show");
        }, 100);

        // Change background to a celebratory gradient
        document.body.style.backgroundImage = "linear-gradient(135deg, #f5f7fa 0%, #b8c6db 100%)";
    }, 300);
}

// Handle Next button click with animation
function handleNextButton() {
    questionContainer.classList.add("fade-out");

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 300);
}

// Event listeners
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < shuffledQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener("click", () => {
    scoreContainer.classList.remove("show");
    setTimeout(() => {
        startQuiz();
    }, 300);
});

// Start the quiz when page loads
startQuiz(); 