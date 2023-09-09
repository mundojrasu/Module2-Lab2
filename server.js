// Import the required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Create an instance of express
const app = express();

// We use the 'body-parser' middleware which the incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
console.log("views", path.join(__dirname, "views"));

//create a route for the home page
//The GET route for the form
app.get("/", (req, res) => {
  res.render("books.ejs");
});

// Start the server on port 4000
// Note we are advertising the service on port 4000 and not 3000 this time
var port = 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
