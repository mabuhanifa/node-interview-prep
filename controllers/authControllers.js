require("dotenv").config();

const userDB = {
  users: require("../data/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = userDB.users.find((person) => person.username === user);

  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expireIn: "30s" }
    );

    const resfreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expireIn: "1d" }
    );

    res.json({
      //create JWTs here

      success: `User ${foundUser.username} is logged in`,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
