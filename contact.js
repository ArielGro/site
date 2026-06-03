/**
 * contact.js
  ─────────────────────────────────────────────────────────────────
 
     HOW IT WORKS:
 *   1. Listens for a click on the #submitBtn button.
 *   2. Reads values from every form field.
 *   3. Runs a series of validation checks in order; shows an alert
 *      and returns early on the first failure found.
 *   4. If all checks pass, sends the data as JSON to the local
 *      Express server (server.js) at POST http://localhost:3000/post.

/* ─── EVENT LISTENER ───────────────────────────────────────────────
   Attaches the validateForm function to the Submit button's click
   event. This runs as soon as the script is loaded, so the button
   must already exist in the DOM — that's why <script> is placed
   at the bottom of <body> in contacts.html.
──────────────────────────────────────────────────────────────────── */
document.getElementById("submitBtn").addEventListener("click", validateForm);


/* ─── MAIN VALIDATION + SUBMIT FUNCTION ────────────────────────────
──────────────────────────────────────────────────────────────────── */
function validateForm() {

    /* ── READ FIELD VALUES ──────────────────────────────────────────
       Each variable captures the current value of its corresponding
       form input at the moment the button is clicked.
    ────────────────────────────────────────────────────────────────*/
    const username  = document.getElementById("username").value;  // text input
    const email     = document.getElementById("email").value;     // email input
    const age       = document.getElementById("age").value;       // number input
    const phone     = document.getElementById("Tel").value;       // tel input
    const issue     = document.getElementById("Issue").value;     // select dropdown
    const issueText = document.getElementById("message").value;   // textarea

    /* ── PRE-COMPUTE: email @ position ─────────────────────────────
       Used in the email validation check below.
       indexOf returns -1 if "@" is not found.
    ────────────────────────────────────────────────────────────────*/
    const atIndex = email.indexOf("@");


    /* ══════════════════════════════════════════════════════════════
       VALIDATION CHECKS
       Each check alerts the user and returns (exits the function)
       on failure, so only one error message shows at a time.
       Order matters: earlier checks run first.
    ══════════════════════════════════════════════════════════════ */

    /* ── CHECK 1: Username — not empty ─────────────────────────────
       Prevents submitting with a blank username field.
    ────────────────────────────────────────────────────────────────*/
    if (username === "") {
        alert("Please enter a username!");
        return;
    }

    /* ── CHECK 2: Username — length between 3 and 20 characters ────
       Prevents too-short or too-long usernames.
    ────────────────────────────────────────────────────────────────*/
    if (username.length < 3 || username.length > 20) {
        alert("Username must be between 3 and 20 characters!");
        return;
    }

    /* ── CHECK 3: Username — must contain a capital letter AND a digit
       Loops through every character of the username to set two flags.
       hasCapLetter → true when any char is A–Z
       hasNumber    → true when any char is 0–9
       If either flag is still false after the loop, validation fails.
    ────────────────────────────────────────────────────────────────*/
    let hasCapLetter = false;
    let hasNumber    = false;

    for (let i = 0; i < username.length; i++) {
        if (username[i] >= 'A' && username[i] <= 'Z') {
            hasCapLetter = true;  // found an uppercase letter
        }
        if (username[i] >= '0' && username[i] <= '9') {
            hasNumber = true;     // found a digit
        }
    }

    if (!hasCapLetter || !hasNumber) {
        alert("The username must contain one Cap letter, one small letter, and one number.");
        return;
    }

    /* ── CHECK 4: Email — must contain "." and "@" with chars before "@"
    ────────────────────────────────────────────────────────────────*/
    if (email.indexOf(".") === -1 || atIndex <= 0) {
        alert("Invalid email! Make sure it contains an @ and . and has characters before the @.");
        return;
    }

    /* ── CHECK 5: Age — must be between 15 and 119 inclusive ───────
       The input default is 16; the HTML min/max attributes hint the
       browser, but JS does the real enforcement here.
    ────────────────────────────────────────────────────────────────*/
    if (age < 15 || age >= 120) {
        alert("Age must be at least 15 and less than 120!");
        return;
    }

    /* ── CHECK 6: Phone — not empty ────────────────────────────────
       Catches the case where the user deletes the pre-filled "05".
    ────────────────────────────────────────────────────────────────*/
    if (phone === "") {
        alert("Please enter a phone number!");
        return;
    }
    let phoneHasNumber    = true;
    for(let i = 0; i < phone.length; i++) {
        if (phone[i] < '0' || phone[i] > '9') {
            phoneHasNumber = false;     // found a non-digit character
        }
    }
    if (!phoneHasNumber) {
        alert("Phone number must contain only digits!");
        return;
    }
    /* ── CHECK 7: Phone — must be exactly 10 digits ────────────────
       Israeli mobile numbers are 10 digits (e.g. 0541234567).
       Checks length only
    ────────────────────────────────────────────────────────────────*/
    if (phone.length !== 10) {
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

    /* ── CHECK 8: Issue dropdown — a category must be selected ─────
       The default <option> has value="" — if the user hasn't changed
       it, this check fails and shows a prompt to choose a category.
    ────────────────────────────────────────────────────────────────*/
    if (issue === "") {
        alert("Please select an issue!");
        return;
    }

    /* ── CHECK 9: Message textarea — must not be empty ─────────────
       Ensures the user actually describes their issue before sending.
    ────────────────────────────────────────────────────────────────*/
    if (issueText === "") {
        alert("Please describe your issue in detail!");
        return;
    }


    /* ══════════════════════════════════════════════════════════════
       ALL CHECKS PASSED — SEND DATA TO THE SERVER
       Uses the Fetch API to send a POST request to the local
       Express server (server.js) running on port 3000.

       Request format:
         Method  : POST
         Headers : Content-Type: application/json
         Body    : JSON string with all six validated field values

       Response handling:
         .then(res => res.text()) — reads the plain-text response body
         .then(data => alert(data)) — shows it to the user in an alert
         .catch(err => console.error(err)) — logs any network errors
    ══════════════════════════════════════════════════════════════ */
    fetch("http://localhost:3000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name:      username,  
            email:     email,     
            age:       age,       
            phone:     phone,     
            issue:     issue,     
            issueText: issueText  
        })
    })
    .then(res => res.text())           // parse the server's plain-text response
    .then(data => alert(data))         // show the response message to the user
    .catch(err => console.error(err)); // log any fetch/network errors to the console           
}