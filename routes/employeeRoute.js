const ROLES_LIST = require("../config/roles_list");
const {
  getAllEmployees,
  createNewEmployee,
} = require("../controllers/employeeControllers");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

const router = require("express").Router();

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), verifyJWT, getAllEmployees)
  .post(ROLES_LIST.Admin, verifyJWT, createNewEmployee);

module.exports = router;
