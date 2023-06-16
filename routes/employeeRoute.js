const { getEmployees } = require("../controllers/employeeControllers");
const verifyJWT = require("../middleware/verifyJWT");

const router = require("express").Router();

router.route("/").get(verifyJWT, getEmployees);

module.exports = router;
