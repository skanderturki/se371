const Employee = require('../schema/employee');

const add_employee = (request, response) => {
  let name = request.params.name;
  let age = request.params.age;
  let positions = request.params.positions.split(";");

  let emp = new Employee({ name: name, age: age, positions: positions });
  emp.save()
      .then( (result) => { 
          console.log('Data saved...'); 
          // Just to see in the browser that save worked correctly
          response.send(result);
      })
      .catch( (err) => console.log(err));
}

const all_employees = (request, response) => {
  Employee.find()
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err) 
    });
}

const find_employee_byID = (request, response) => {
  Employee.findById(request.params.id)
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
}


const find_employees_byPosition = (request, response) => {
  Employee.find({ positions: request.params.position })
  .sort({ age : -1})
  .select('name positions')
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
}

const find_employees_byPosition_caseInsensitive = (request, response) => {
  Employee.find({ positions: { $regex : new RegExp(request.params.position, "i") } })
  .sort({ age : -1})
  .select('name positions')
    .then( (result) => {
      response.send(result);
    })
    .catch( (err) => {
      console.log(err);
    });
}

 module.exports = {add_employee, all_employees, find_employee_byID, find_employees_byPosition, find_employees_byPosition_caseInsensitive};