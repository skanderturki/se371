const express = require('express');
const employeeController = require('../controller/employeeController');

const router = express.Router();

router.get('/add-employee/name/:name/age/:age/positions/:positions', 
          employeeController.add_employee);


// This route causes a validation error because name is defined as required in the model 
router.get('/add-employee/age/:age/positions/:positions', 
          employeeController.add_employee);

router.get('/all-employees', employeeController.all_employees);

router.get('/find-employee/id/:id', employeeController.find_employee_byID);

router.get('/find-employee/position/:position', employeeController.find_employees_byPosition);
router.get('/find-employee/position_incencitive/:position', employeeController.find_employees_byPosition_caseInsensitive);


module.exports = router;