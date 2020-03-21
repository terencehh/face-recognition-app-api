// Express.js for server-side routing
const express = require("express");
const PORT = process.env.PORT;

// bcrypt for hashing passwords
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/sign-in");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});
// https://protected-scrubland-83638.herokuapp.com/


const app = express();
// allow cross origin resource sharing
app.use(cors());
app.use(express.json());


//profile/:userId --> GET Request --> {user}
app.get("/", (req, res) => {
  res.send("App is working!");
});

//signin --> POST Request --> Success/Fail
app.post("/signin", signin.handleSignIn(db, bcrypt));

//register --> POST Request --> {user}
app.post("/register", register.handleRegister(db, bcrypt));

//profile/:userId --> GET Request --> {user}
app.get("/profile/:id", profile.handleProfileGet(db));

//image --> PUT --> user (with updated count)
app.put("/image", image.handleImagePut(db));

//API call to Clarifai
app.post("/imageurl", image.handleApiCall());

app.listen(PORT || 3000, () => {
  console.log(`Server Successfully Started on Port ${PORT}`);
});
