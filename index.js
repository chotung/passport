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

const authType = "oauth2"
const auth = passport.authenticate(authType, { failureRedirect: '/login' });

// app.use("/users", auth, userRoutes);
// app.use("/users", userRoutes);

// app.get("/", auth, (req, res) => {
// 	res.send("you're authed")
// })

app.get('/api/auth/authorize', passport.authenticate("oauth2"))
app.get('/api/auth/authorize/callback', auth, (req, res) => {
	res.redirect('/')
})

app.get("/", auth, (req, res) => {
	res.send('authed!')
})

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`App listening on http://localhost:${port}`);
});
