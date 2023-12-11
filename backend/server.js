const express = require("express");
var cors = require('cors');
let dbConnect = require("./dbConnect");

const app = express();
require("dotenv").config();
// parse requests of content-type - application / json;
app.use(express.json());
app.use(cors());

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
