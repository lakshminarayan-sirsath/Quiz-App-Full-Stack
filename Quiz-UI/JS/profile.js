// Function to get the logged-in user's ID from local storage
function getUserId() {
    return localStorage.getItem('userId');
}

// Function to handle the logout action
function logout() {
    // Clear user data from localStorage (if you're storing it there)
    localStorage.removeItem('userId');
    localStorage.removeItem('userProfile');  // Optional: Remove any profile data
    localStorage.removeItem('quizType'); // Optional: Remove any quiz data if needed

    // Redirect the user to the index page after logging out
    window.location.href = 'index.html';  // Redirect to your homepage or index page
}

// Function to prevent back navigation when on the profile page
function preventBackNavigation() {
    if (window.location.pathname === '/profile.html') {  // Adjust the profile path if needed
        history.pushState(null, null, window.location.href);  // Add a state in history
        window.onpopstate = function () {
            history.go(1); // Force forward navigation when user tries to go back
        };
    }
}

// Function to fetch user profile data from the API
async function fetchUserProfile() {
    const userId = getUserId(); // Get the logged-in user's ID from local storage
    if (!userId) {
        alert('You need to log in first.');
        window.location.href = 'login.html'; // Redirect to login page if user is not logged in
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/scores/profile?userId=${userId}`); // Fetch data from API using userId
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userProfile = await response.json(); // Parse the response to get the user profile data

        // Display the user profile information on the page
        document.getElementById('user-profile-info').innerHTML = `
            <p><strong>First Name:</strong> ${userProfile.firstname}</p>
            <p><strong>Last Name:</strong> ${userProfile.lastname}</p>
            <p><strong>Email:</strong> ${userProfile.email}</p>
            <p><strong>Account Created On:</strong> ${new Date(userProfile.createdAt).toLocaleDateString()}</p>
        `;

        // Display the user's quiz scores
        const scoreTable = document.getElementById('score-table');
        userProfile.scores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.quizType}</td>
                <td>${score.score}</td>
                <td>${new Date(score.dateTaken).toLocaleString()}</td>
            `;
            scoreTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to load profile data. Please try again.');
    }
}

// Function to initialize the profile page when the page loads
function initializeProfilePage() {
    preventBackNavigation(); // Prevent back navigation to ensure profile is not easily accessible without login
    fetchUserProfile(); // Fetch and display the user profile data
}

// Initialize the profile page when it loads
window.onload = initializeProfilePage;
