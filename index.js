const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const log = require("log");

// Routes
const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

// Middleware
app.use(passport.initialize());
require("./passport-config")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.body) log.info(req.body);
  if (req.params) log.info(req.params);
  if (req.query) log.info(req.query);
  log.info(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
  next();
});

// MONGOOSE/MONGO
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("Connected Succuessfully to MongoDB"))
  .catch((err) => console.error(err));

const authType = "jwt"
const auth = passport.authenticate(authType, { session: false });

// app.use("/users", auth, userRoutes);
app.use("/users", userRoutes);

app.get("/", auth, (req, res) => {
	res.send("you're authed")
})

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`App listening on http://localhost:${port}`);
});
