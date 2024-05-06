const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: String,
  phoneNo: String,
  licenseNumber: { type: String, unique: true },
  department: String,
  availabilityStatus: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
