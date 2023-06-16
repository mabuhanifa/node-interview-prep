const userDB = {
  users: require("../data/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = userDB.users.find((person) => person.username === user);

  //Conflict
  if (duplicate)
    return res.status(400).json({
      message: `User with username ${user} already exists`,
    });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //store the new user
    const newUser = {
      username: user,
      roles: {
        User: 2001,
      },
      password: hashedPwd,
    };
    userDB.setUsers([...userDB.users, newUser]);

    //write the db file
    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "user.json"),
      JSON.stringify(userDB.users)
    );

    console.log(userDB.users);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
