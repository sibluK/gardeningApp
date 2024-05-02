document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sign-in-submit').addEventListener('click', function (event) {

        event.preventDefault();

        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };

        fetch('/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to sign in');
            }
            return response.json();
        })
        .then(data => {
            const userId = data.userId;
            const username = data.username;
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username)
            window.location.href = '../pages/user/html/mainuser.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});