function validateForm() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("Tel").value;
    const issue = document.getElementById("Issue").value;

    if (username.trim() === "") {
        alert("Please enter a username!");
        return; 
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    if (age < 15 || age > 120) {
        alert("Age must be between 15 and 120!");
        return;
    }

    const phonePattern = /^[0-9]{10}$/; 
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number (e.g., 0501234567)!");
        return;
    }

    if (issue === "") {
        alert("Please select an issue!");
        return;
    }

    alert("Everything looks good!");
}