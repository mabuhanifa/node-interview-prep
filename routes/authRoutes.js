const { handleLogin } = require("../controllers/authControllers");

const router = require("express").Router();

router.route("/").post(handleLogin);

module.exports = router;