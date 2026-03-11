function validateForm() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("Tel").value;
    const issue = document.getElementById("Issue").value;


    const usernamePattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9_]+$/;

    if (username.trim() === "") {
        alert("Please enter a username!");
        return; 
    }

    if( username.length < 3 || username.length > 20) {
        alert("Username must be between 3 and 20 characters!");
        return;
    }

    if(!usernamePattern.test(username)) {
        alert("The username must contain one Cap letter, one small letter, and one number.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    const numberCheck = /[0-9]/;
    if (numberCheck.test(email)) {
        alert("Your email cannot contain numbers! Letters only, please.");
        return;
    }

    if (age < 15 || age >= 120) {
        alert("Age must be at least 15 and less than 120!");
        return;
    }

    const phonePattern = /^[05][0-9]{9}$/; 
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number (e.g., 0501234567)!");
        return;
    }

    if (issue === "") {
        alert("Please select an issue!");
        return;
    }

    alert("Everything looks good!");
}