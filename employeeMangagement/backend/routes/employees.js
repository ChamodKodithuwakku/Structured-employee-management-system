const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// POST route to submit employee data
router.post('/submitEmployeeData', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch all employee data
router.get('/getEmployees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route to delete employee data by ID
router.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        const result = await Employee.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).send();  // No content to send back
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch employee data by ID
router.get('/getEmployee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update employee data by ID
router.put('/updateEmployee/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch employee report data
router.get('/employeeReportData', async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const activeEmployees = await Employee.countDocuments({ availabilityStatus: "available" });
        const onLeaveEmployees = await Employee.countDocuments({ availabilityStatus: "onLeave" });
        const systemDeptCount = await Employee.countDocuments({ department: "systemManagement" });
        const financialDeptCount = await Employee.countDocuments({ department: "financialManagement" });
        const vetDeptCount = await Employee.countDocuments({ department: "veterinarian" });

        res.status(200).json({
            totalEmployees,
            activeEmployees,
            onLeaveEmployees,
            systemDeptCount,
            financialDeptCount,
            vetDeptCount
        });
    } catch (err) {
        console.error('Failed to fetch employee report data:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
