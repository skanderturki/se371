const express = require('express');
const employeeController = require('../controller/employeeController');

const router = express.Router();

router.post('/v1/name/:name/age/:age/positions/:positions', 
          employeeController.add_employee);

// This route is just to illustrate mongoose data validation
router.post('/v1/age/:age/positions/:positions', employeeController.add_employee);

router.get('/v1/', employeeController.all_employees);

router.get('/v1/id/:id', employeeController.find_employee_byID);

router.get('/v1/position/:position', employeeController.find_employees_byPosition);
router.get('/v1/position_incensitive/:position', employeeController.find_employees_byPosition_caseInsensitive);


module.exports = router;