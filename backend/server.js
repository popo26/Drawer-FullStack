const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("./passport");
const MongoStore = require("connect-mongo");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

const cors = require("cors");
let dbConnect = require("./dbConnect");

const app = express();
require("dotenv").config();
// parse requests of content-type - application / json;
app.use(express.json());
app.use(cors());

//Middleware
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//sessions
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "fraggle-rock", // It holds the secret key for session
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI || "mongodb://127.0.0.1/drawer-local",
    }),
    // store: MongoStore.create("mongodb://127.0.0.1/drawer-local"),
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
      // Session expires after 10 min of inactivity.
      expires: 600000,
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

//swagger
//ref: https://swagger.io/docs/specification/2-0/describing-request-body/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
