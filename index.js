const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGOOSE/MONGO
mongoose.connect(process.env.MONGOURI || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

const userSchema = new mongoose.Schema({
	name:string
})

const User = mongoose.model('User', userSchema)



app.get("*", (req, res) => {
  res.send("hello world");
});

app.listen(port, console.log(`App listening on http://localhost:${port}`));
