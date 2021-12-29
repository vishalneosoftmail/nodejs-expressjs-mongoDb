const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
  empId: {
    type: Number,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  empdept: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

var employeeModel = mongoose.model("employeeModel", empSchema);
module.exports = employeeModel;
