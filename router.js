const express = require("express");

const employee_cntrl = require("./controller/employeeCntrl");
const router = express.Router();

router.get("/", employee_cntrl.getEmployees);
router.get("/:empId", employee_cntrl.getEmployee);
router.post("/", employee_cntrl.createEmployee);
router.patch("/:empId", employee_cntrl.updateEmployee);
router.delete("/:empId", employee_cntrl.deleteEmployee);
module.exports = router;
