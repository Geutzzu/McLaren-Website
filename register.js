function register() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var phoneNumber = document.getElementById('phonenumber').value;
    var age = document.getElementById('age').value;
    var experience = document.getElementById('experience').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var country = document.getElementById('country').value;
    var bio = document.getElementById('bio').value;
    var terms = document.getElementById('terms').checked;

    // Check if terms and conditions are accepted
    if (!terms) {
        alert('You must accept the terms and conditions!');
        return;
    }

    // Fetch the users.json file
    fetch('users.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(users => {
        // Check if the username already exists
        for (let user of users) {
            if (user.username === username) {
                alert('Username already exists!');
                return;
            }
        }

        // If the username doesn't exist, continue with the registration
        var newUser = {
            "username": username,
            "password": password,
            "phoneNumber": phoneNumber,
            "age": age,
            "experience": experience,
            "gender": gender,
            "country": country,
            "bio": bio
        };

        fetch('users.json', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}