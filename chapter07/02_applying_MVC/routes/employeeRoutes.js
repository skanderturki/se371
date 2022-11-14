const express = require('express');
const employeeController = require('../controller/employeeController');

const router = express.Router();

router.get('/add-employee/name/:name/age/:age/positions/:positions', 
          employeeController.add_employee);

router.get('/all-employees', employeeController.all_employees);

router.get('/find-employee/id/:id', employeeController.find_employee_byID);

router.get('/find-employee/position/:position', employeeController.find_employees_byPosition);

module.exports = router;