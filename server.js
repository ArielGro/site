/**
 * server.js
  ─────────────────────────────────────────────────────────────────
  HOW TO RUN:
 *   1. Make sure Node.js and npm are installed.
 *   2. Run:  node server.js
 *   3. Server starts at http://localhost:3000
 
  ENDPOINTS:
 *   GET  /get  — receives URL query parameters, logs them
 *   POST /post — receives a JSON body, logs it
  ─────────────────────────────────────────────────────────────────
 */
const express    = require("express");
const bodyParser = require("body-parser");

const app  = express();
const port = 3000; /* The port the server listens on locally */


/* ─── MIDDLEWARE: JSON body parsing ────────────────────────────────
   Tells Express to parse incoming requests with Content-Type:
   application/json and attach the parsed object to req.body.
   Without this, req.body would be undefined in the POST route.
──────────────────────────────────────────────────────────────────── */
app.use(bodyParser.json());


/* ─── MIDDLEWARE: CORS headers ──────────────────────────────────────
   CORS (Cross-Origin Resource Sharing) is a browser security policy
   that blocks requests from one origin (e.g. file:// or localhost:5500)
   to a different origin (localhost:3000) by default.

   This middleware adds two headers to EVERY response:
     Access-Control-Allow-Origin: *
       → allows requests from any domain (good for local dev;
         restrict to a specific origin in production)
     Access-Control-Allow-Headers: Content-Type
       → allows the frontend to send the Content-Type: application/json
         header in its fetch() call (required for JSON POST requests)

   next() passes control to the next middleware or route handler.
──────────────────────────────────────────────────────────────────── */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


/* ─── ROUTE: GET /get ───────────────────────────────────────────────
   Handles HTTP GET requests to http://localhost:3000/get.
   GET requests pass data via URL query parameters, e.g.:
     GET /get?name=Ariel&age=16
   req.query contains all key-value pairs from the query string.

   console.log prints the received data to the server terminal
   for debugging/monitoring purposes.
   res.send() sends a plain-text response back to the caller.
──────────────────────────────────────────────────────────────────── */
app.get("/get", (req, res) => {
    console.log("GET request data:", req.query); /* logs: { name: 'Ariel', age: '16' } */
    res.send("the data received successfully!");
});


/* ─── ROUTE: POST /post ─────────────────────────────────────────────
   Handles HTTP POST requests to http://localhost:3000/post.
   This is the endpoint called by contact.js after validation passes.

   The frontend sends:
     fetch("http://localhost:3000/post", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, email, age, phone, issue, issueText })
     })

   body-parser parses the JSON body → req.body contains the object:
     { name, email, age, phone, issue, issueText }

   console.log prints it to the terminal for debugging.
   res.send() sends the success message back; contact.js shows it
   to the user in an alert() dialog.
──────────────────────────────────────────────────────────────────── */
app.post("/post", (req, res) => {
    console.log("POST request data:", req.body); /* logs the full submitted form object */
    res.send("the data received successfully!");
});


/* ─── START SERVER ──────────────────────────────────────────────────
   app.listen() starts the HTTP server on the specified port.
   The callback runs once the server is ready to accept connections,
   printing the URL to the terminal so you know it's running.
──────────────────────────────────────────────────────────────────── */
app.listen(port, () => {
    console.log(`the server is running : http://localhost:${port}`);
});