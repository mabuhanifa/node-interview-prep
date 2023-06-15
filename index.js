const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
