const express = require("express");
const cors = require('cors');
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


const passport = require("passport");

let dbConnect = require("./dbConnect");

const app = express();
require("dotenv").config();
// parse requests of content-type - application / json;
// app.use(express.json());

app.use(express.json({
  type:['application/json', "text/plain"]
}));

// app.use(express.json({
//   type:['application/json']
// }));

app.use(cors());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

//Need this to logout and clear access_token
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// const User = require('./models/user');

// const userInput = {
//   username:"aie@gmail.com",
//   password: "123456",
//   role:"admin"
// }

// const userNew = new User(userInput);
// userNew.save()



let userRoutes = require("./routes/userRoutes");
let drawerRoutes = require("./routes/drawerRoutes");
let scribbleRoutes = require("./routes/scribbleRoutes");

app.use("/api/users", userRoutes);
app.use("/api/drawers", drawerRoutes);
app.use("/api/scribbles", scribbleRoutes);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
