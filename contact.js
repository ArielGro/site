document.getElementById("submitBtn").addEventListener("click", validateForm);

function validateForm() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("Tel").value;
    const issue = document.getElementById("Issue").value;
    const issueText = document.getElementById("message").value;
    const sound_no = document.getElementById("bonnie-sound");
    const submit = document.getElementById("submit-sound");

    const usernamePattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9_]+$/;

    // --- Validation Checks ---
    if (username.trim() === "") {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Please enter a username!");
        return;
    }
    if (username.length < 3 || username.length > 20) {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Username must be between 3 and 20 characters!");    
        return;
    }
    if (!usernamePattern.test(username)) {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("The username must contain one Cap letter, one small letter, and one number.");
        return;
    }

    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(email)) {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Invalid email! Make sure it contains an @ and .");
        return;
    }
    if (age < 15 || age >= 120) {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Age must be at least 15 and less than 120!");
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Please enter a valid 10-digit phone number!");
        return;
    }
    if (issue === "") {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Please select an issue!");    
        return;
    }
    if (issueText.trim() === "") {
        if (sound_no) {
        sound_no.currentTime = 0; 
        sound_no.play();
        }
        alert("Please describe your issue in detail!");
        return;
    }
    if (submit) {
        submit.currentTime = 0; 
        submit.play();
    }
    const formData = {
        name: username,
        email: email,
        age: age,
        phone: phone,
        issue: issue,
        issueText: issueText
    };

    fetch("http://localhost:3000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(res => res.text())
    .then(data => alert(data))
    .catch(err => console.error(err));
}
