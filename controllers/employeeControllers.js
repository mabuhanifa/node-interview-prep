const employees = require("../data/employees.json");

const getEmployees = (req, res) => {
  res.send(employees);
};

module.exports = { getEmployees };
