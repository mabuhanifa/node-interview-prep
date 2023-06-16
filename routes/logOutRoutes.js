const { handleLogout } = require("../controllers/logOutControllers");

const router = require("express").Router();

router.route("/").get(handleLogout);

module.exports = router;
