document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
});

function login(email, password) {
    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) { // Assuming the response includes a token
                sessionStorage.setItem('userToken', data.token);
                alert('Login successful');
                // Redirect to another page or update UI
            } else {
                alert('Login failed');
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login error');
        });
}

