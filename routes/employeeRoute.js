const { getEmployees } = require("../controllers/employeeControllers");

const router = require("express").Router();

router.route("/").get(getEmployees);

module.exports = router;
