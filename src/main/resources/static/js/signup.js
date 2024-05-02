document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sign-up-submit').addEventListener('click', function (event) {
        
        event.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
              
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            email: document.getElementById('email').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            password: document.getElementById('password').value,
            username: document.getElementById('username').value,
        };
        
        fetch('/user/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
        })
        .then(data => {
            console.log('User created:', data);
            alert('Registration successfull!');
          })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
