let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0;
let totalQuestions = 0; // Set dynamically

// Fetch questions from the backend
async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:8080/api/questions?quizType=python');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        questions = await response.json();
        totalQuestions = questions.length;
        document.getElementById('total-questions').textContent = totalQuestions;
        displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
        document.getElementById('question-text').textContent = "Failed to load questions. Please try again.";
    }
}

// Display the current question
function displayQuestion() {
    if (questions.length === 0) return;

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.questionText;
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
}

// Check if the answer is correct and update the score
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswers++;
    }
    nextQuestion();
}

// Move to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        saveScore(); // Save score after the quiz is completed
    }
}

// Save the score to the backend
async function saveScore() {
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage after login
    const quizType = 'python'; // Specify the quiz type

    const scoreData = {
        user: { id: userId },
        quizType: quizType,
        score: correctAnswers
    };

    try {
        const response = await fetch('http://localhost:8080/api/scores/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scoreData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to save score');
        }
        
        const result = await response.json();
        console.log('Score saved successfully:', result);
        window.location.href = 'result.html'; // Redirect to result page
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

window.onload = fetchQuestions;
