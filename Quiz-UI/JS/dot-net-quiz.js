let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0; // Variable to track the number of correct answers
let totalQuestions = 0; // This will be set dynamically based on the API response

// Function to fetch questions from the API
async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:8080/api/questions?quizType=dot-net'); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        questions = await response.json(); // Assume API returns an array of question objects
        totalQuestions = questions.length; // Set totalQuestions based on fetched data
        document.getElementById('total-questions').textContent = totalQuestions; // Update the total questions in the HTML
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
        button.onclick = () => checkAnswer(option); // Call checkAnswer on click
        optionsContainer.appendChild(button);
    });

    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
}

// Check if the answer is correct and update the score
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    // Ensure the property name is correct
    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswers++; // Increment score if the answer is correct
    }

    // Automatically move to the next question after selecting an answer
    nextQuestion();
}

// Move to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Quiz Completed: Save score and redirect to results page
        saveScore(); // Save score using the backend API
    }
}

// Function to save the score to the backend
async function saveScore() {
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage after login
    const quizType = 'dot-net'; // Specify the quiz type

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

// Load questions when the page loads
window.onload = fetchQuestions;
