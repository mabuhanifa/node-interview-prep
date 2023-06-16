const { getEmployees } = require("../controllers/employeeControllers");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

const router = require("express").Router();

router.route("/").get(verifyRoles(),verifyJWT, getEmployees);

module.exports = router;
