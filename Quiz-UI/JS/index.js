// Show Registration Form
document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

// Show Login Form
document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
});

// Register User
document.getElementById('registerFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Send data to server for registration
    fetch('http://127.0.0.1:8080/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful! Please login.');
            document.getElementById('showLogin').click();
        } else {
            alert('Registration failed. Please try again.');
        }
    });
});

// Login User
document.getElementById('loginFormSubmit').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Validate input
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Send data to server for login
    fetch('http://127.0.0.1:8080/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || 'Invalid email or password.');
                });
            }
            return response.json();
        })
        .then((data) => {
            if (data.id) {
                // Save user ID in local storage
                localStorage.setItem('userId', data.id);

                // Redirect to the main quiz view
                window.location.href = '/quiz-main-view.html';
            } else {
                alert('Invalid email or password.');
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert(`Login failed: ${error.message}`);
        });
});
