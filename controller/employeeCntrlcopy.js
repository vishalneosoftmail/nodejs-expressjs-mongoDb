let { employees } = require("../data");
const mongoose = require("mongoose");

const employeeModel = require("../models/employeeModel.js");

const getEmployees = (req, res) => {
  res.status(200).json({ success: true, data: employees });
};

const getEmployee = (req, res) => {
  const { empId } = req.params;
  if (!empId) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide Employee Id" });
  }
  const emp = employees.find((emp) => emp.empId === Number(empId));
  if (!emp) {
    return res
      .status(404)
      .json({ success: false, msg: `Employees Not Found with id ${empId}` });
  }
  res.status(200).json({ success: true, data: emp });
};

// const createEmployee = (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: "please provide name value" });
//   }
//   res.status(201).send({ success: true, person: name });
// };

const createEmployee = (req, res) => {
  const { empId, empName, empdept, mobile, email, role } = req.body;
  if (!empId || !empName || !empdept || !mobile || !email || !role) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide all data" });
  }

  employees = [
    ...employees,
    {
      empId: empId,
      empName: empName,
      empdept: empdept,
      mobile: mobile,
      email: email,
      role: role,
    },
  ];
  res.status(201).send({
    success: true,
    data: employees,
  });
};

const updateEmployee = (req, res) => {
  const { empId } = req.params;
  const { empName, empdept, mobile, email, role } = req.body;
  if (!empId || !empName || !empdept || !mobile || !email || !role) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide all data" });
  }
  const emp = employees.find((emp) => emp.empId === Number(empId));

  if (!emp) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with Emp ID ${empId}` });
  }
  const newEmployees = employees.map((emp) => {
    if (emp.empId === Number(empId)) {
      emp.empId = empId;
      emp.empName = empName;
      emp.empdept = empdept;
      emp.mobile = mobile;
      emp.email = email;
      emp.role = role;
    }
    return emp;
  });
  res.status(200).json({ success: true, data: newEmployees });
};

const deleteEmployee = (req, res) => {
  const emp = employees.find((emp) => emp.empId === Number(req.params.empId));
  if (!emp) {
    return res
      .status(404)
      .json({ success: false, msg: `no employee with id ${req.params.empId}` });
  }
  const newEmployees = employees.filter(
    (e) => e.empId !== Number(req.params.empId)
  );
  return res.status(200).json({ success: true, data: newEmployees });
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
