// Import the required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");

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
  res.render("index");
});

const books = [];

app.get("/books", (res, req) => {
  res.render("books", { books });
});

app.post("/addBook", (req, res) => {
  const { title, author, publicationYear } = req.body;
  books.push({ title, author, publicationYear });
  res.redirect("/books");
});

//create a route for users to enter the numbers
app.post("/calculate", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = Number(num1) + Number(num2);
  const difference = Number(num1) - Number(num2);
  const product = Number(num1) * Number(num2);
  const quotient = Number(num1) / Number(num2);
  res.render("results", { sum, difference, product, quotient });
});

//Constructors and DE Structuring
function User(name, age, email) {
  this.name = name;
  this.age = age;
  this.email = email;
}

// route handler for the form
app.post("/createUser", (req, res) => {
  const { name, age, email } = req.body;
  const user = new User(name, age, email);
  const { name: userName, age: userAge, email: userEmail } = user;
  res.render("userInfo", { userName, userAge, userEmail });
});

//Fruits Constructor
const fruits = ["Apple", "Banana", "Orange"];

app.get("/fruits", (req, res) => {
  res.render("fruits", { fruits });
});

app.post("/addFruit", (req, res) => {
  const { fruit } = req.body;
  fruits.push(fruit);
  res.redirect("/");
});

app.get("/simulateAsync", (req, res) => {
  setTimeout(() => {
    res.json({ message: "Asynchronous operation completed!" });
  }, 2000);
});

app.post("/makeRequest", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Start the server on port 4000
// Note we are advertising the service on port 4000 and not 3000 this time
var port = 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
