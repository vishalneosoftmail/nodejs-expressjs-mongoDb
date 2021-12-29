let { employees } = require("../data");
const mongoose = require("mongoose");

const employeeModel = require("../model/employeeModel.js");

const getEmployees = async (req, res) => {
  try {
    const emp = await employeeModel.find();

    res.status(200).json({ success: true, emp });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getEmployee = async (req, res) => {
  const { empId } = req.params;
  if (!empId) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide Employee Id" });
  }
  try {
    const emp = await employeeModel.findOne({ empId: empId });

    res.status(200).json({ success: true, emp });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
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

const createEmployee = async (req, res) => {
  const newEmp = new employeeModel({
    empId: req.body.empId,
    empName: req.body.empName,
    empdept: req.body.empdept,
    mobile: req.body.mobile,
    email: req.body.email,
    role: req.body.role,
  });

  try {
    await newEmp.save();

    res.status(201).json({ success: true, newEmp });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { empId } = req.params;

  try {
    await employeeModel.findOneAndUpdate(
      {
        empId: empId,
      },
      {
        empName: req.body.empName,
        empdept: req.body.empdept,
        mobile: req.body.mobile,
        email: req.body.email,
        role: req.body.role,
      }
    );
    res.status(202).json({ success: true, empId: empId });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const empId = req.params.empId;
  try {
    await employeeModel.findOneAndRemove({ empId: empId });
    res.status(203).json({ success: true, empId: empId });
  } catch (error) {
    res.status(402).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
