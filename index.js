const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html")); /*same as above*/
});

app.get("/new.html", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "new.html")); /*same as above*/
});

app.get("/hello(.html)?", (req, res,next) => {
  console.log(`Attempted to access hello.html with url : -> ${req.url}`);
  next();
},(req,res)=>{
  res.sendFile(path.join(__dirname, "views", "hello.html"));
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
