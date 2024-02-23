const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"],
        answer: "Mitochondria"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results-container');
const resultsElement = document.getElementById('results');

function showQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = '';

    current.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsElement.appendChild(button);
    });

    if (currentQuestion === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentQuestion === questions.length - 1) {
        nextButton.disabled = true;
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.disabled = false;
        submitButton.style.display = 'none';
    }
}

function selectAnswer(option) {
    const current = questions[currentQuestion];
    if (option === current.answer) {
        score++;
    }
    const buttons = optionsElement.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === option) {
            button.classList.add('selected');
            if (option === current.answer) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        }
        if (button.textContent === current.answer) {
            button.classList.add('correct');
        }
    });
}

function showResults() {
    resultsElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    resultsContainer.style.display = 'block';
}

prevButton.addEventListener('click', () => {
    currentQuestion--;
    showQuestion();
});

nextButton.addEventListener('click', () => {
    currentQuestion++;
    showQuestion();
});

submitButton.addEventListener('click', () => {
    showResults();
});

showQuestion();