const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const registerRouter = require("./routes/registerRoute");
const authRouter = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}}`);
  next();
});

app.use("/register", registerRouter);
app.use("/auth", authRouter);

// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html")); /*same as above*/
});

app.get("/new.html", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "new.html")); /*same as above*/
});

//route handler
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log(`Attempted to access hello.html with url : -> ${req.url}`);
    next();
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, "views", "hello.html"));
  }
);

//chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
