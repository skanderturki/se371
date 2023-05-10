const express = require('express');
const employeeController = require('../controller/employeeController');

const router = express.Router();

router.post('/name/:name/age/:age/positions/:positions', 
          employeeController.add_employee);

// This route is just to illustrate mongoose data validation
router.post('/age/:age/positions/:positions', employeeController.add_employee);

router.get('/', employeeController.all_employees);

router.get('/id/:id', employeeController.find_employee_byID);

router.get('/position/:position', employeeController.find_employees_byPosition);
router.get('/position_incensitive/:position', employeeController.find_employees_byPosition_caseInsensitive);


module.exports = router;