const express = require("express");
const bodyParser = require('body-parser')
//const morgan = require('morgan')
const session = require('express-session')
const passport = require('./passport');
// const MongoStore = require('connect-mongo')(session)
const MongoStore = require('connect-mongo')

var cors = require('cors');
let dbConnect = require("./dbConnect");
// const passport = require('passport')

const app = express();
require("dotenv").config();
// parse requests of content-type - application / json;
app.use(express.json());
app.use(cors());


//sessions
app.use(
  session({
  secret: process.env.EXPRESS_SESSION_SECRET || 'fraggle-rock', //pick a random string to make the hash that is generated secure
  // store: new MongoStore({ mongooseConnection: dbConnect }),
  store: MongoStore.create({mongoUrl:"mongodb://127.0.0.1/drawer-local"}),
  resave: false, //required
  saveUninitialized: false //required  
})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   'Access-Control-Allow-Origin':'*'
// }

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// app.get("/", cors(corsOptions), (req, res) => {
//   res.json({ message: "Welcome to my MongoDB application." });
// });

let userRoutes = require("./routes/userRoutes");
let drawerRoutes = require("./routes/drawerRoutes");
let scribbleRoutes = require("./routes/scribbleRoutes");

app.use("/api/users", userRoutes);
app.use("/api/drawers", drawerRoutes);
app.use("/api/scribbles", scribbleRoutes);
// app.use("/api/scribbles", cors(corsOptions), scribbleRoutes);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
