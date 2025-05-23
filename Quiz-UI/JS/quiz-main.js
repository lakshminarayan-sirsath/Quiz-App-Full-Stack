// Function to get the logged-in user's ID from local storage
function getUserId() {
    return localStorage.getItem('userId');
}

// Function to handle the logout action
function logout() {
    // Clear user data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userProfile');  // Optional: Remove any profile data
    localStorage.removeItem('quizType'); // Optional: Remove any quiz data if needed

    // Redirect the user to the index page after logging out
    window.location.href = 'index.html';  // Redirect to your homepage or index page
}

// Function to prevent back navigation when on the quiz page
function preventBackNavigation() {
    if (window.location.pathname === '/quiz-main-view.html') {  // Adjust the path if needed
        history.pushState(null, null, window.location.href);  // Add a state in history
        window.onpopstate = function () {
            history.go(1); // Force forward navigation when user tries to go back
        };
    }
}

// Function to redirect to the profile page
function showProfile() {
    const userId = getUserId();
    if (userId) {
        // If user is logged in, redirect to profile page
        window.location.href = 'profile.html';
    } else {
        // If user is not logged in, prompt to login
        alert('You need to log in first.');
        window.location.href = 'index.html';
    }
}

// // Function to save score to the database
// async function saveScore(score) {
//     try {
//         const userId = getUserId(); // Get the user ID from local storage
//         if (!userId) {
//             throw new Error('User not logged in');
//         }
//         const quizType = localStorage.getItem('quizType'); // Get the quiz type from local storage
//         if (!quizType) {
//             throw new Error('Quiz type not set');
//         }
//         const response = await fetch('http://localhost:8080/api/scores', { // Updated API URL for saving scores
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userId: userId, // Include the user ID
//                 quizType: quizType,
//                 score: score
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to save score');
//         }

//         alert('Score saved successfully!');
//         window.location.href = 'result.html'; // Redirect to the results page after saving score
//     } catch (error) {
//         console.error('Error saving score:', error);
//         alert('Failed to save score. Please try again.');
//     }
// }

// Function to save score to the database and localStorage
async function saveScore(score, totalQuestions) {
    try {
        const userId = getUserId(); // Get the user ID from local storage
        if (!userId) {
            throw new Error('User not logged in');
        }
        const quizType = localStorage.getItem('quizType'); // Get the quiz type from local storage
        if (!quizType) {
            throw new Error('Quiz type not set');
        }
        
        // Save score and total questions to localStorage for use on result.html
        localStorage.setItem('quizScore', score);
        localStorage.setItem('totalQuestions', totalQuestions);

        const response = await fetch('http://localhost:8080/api/scores', { // Updated API URL for saving scores
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId, // Include the user ID
                quizType: quizType,
                score: score
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save score');
        }

        alert('Score saved successfully!');
        window.location.href = 'result.html'; // Redirect to the results page after saving score
    } catch (error) {
        console.error('Error saving score:', error);
        alert('Failed to save score. Please try again.');
    }
}


// Function to start the quiz
function startQuiz(quizType) {
    // Display a message to the user
    alert(`Starting ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz!`);

    // Store quiz type in local storage for future reference
    localStorage.setItem('quizType', quizType);

    // Fetch questions for the selected quiz type
    fetchQuestions();
}

// Function to fetch questions
async function fetchQuestions() {
    try {
        const quizType = localStorage.getItem('quizType'); // Get the quiz type from local storage
        if (!quizType) {
            alert('Quiz type not set. Please select a quiz.');
            return;
        }

        const response = await fetch(`http://localhost:8080/api/questions?quizType=${quizType}`); // Updated API URL with quizType parameter
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const questions = await response.json(); // Assume API returns an array of question objects
        localStorage.setItem('quizQuestions', JSON.stringify(questions)); // Store the questions locally

        // Redirect to the corresponding quiz page
        window.location.href = `${quizType}-quiz.html`; // Assumes pages are named quiz-java.html, quiz-python.html, etc.
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please try again.');
    }
}

// Function to check if the user is logged in
function checkLoginStatus() {
    const userId = getUserId();
    if (!userId) {
        alert('You need to log in first.');
        window.location.href = 'login.html';
    }
}

// Function to handle quiz type selection
function setupQuizSelection() {
    document.getElementById('startJavaQuiz').addEventListener('click', () => startQuiz('java'));
    document.getElementById('startPythonQuiz').addEventListener('click', () => startQuiz('python'));
    document.getElementById('startHtmlQuiz').addEventListener('click', () => startQuiz('html'));
}

// Function to initialize the quiz main view
function initializeQuizMainView() {
    checkLoginStatus(); // Ensure the user is logged in
    setupQuizSelection(); // Set up event listeners for quiz type selection
}

// Initialize the quiz main view when the page loads
window.onload = initializeQuizMainView;
