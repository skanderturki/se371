
const getAllEmployees = async (request, response) => {
  const employees = await Employee.findAll();
  response.status(200).json({ employees: employees });
}

const createEmployee = async (request, response) => {
  const { id, name, position, age, city, countryId } = request.body;
  const newEmployee = Employee.build({ "id": id, "name": name, "position": position, "age": age, "city": city, "CountryId": countryId });

  try {
    await newEmployee.save();
    response.status(201).json(newEmployee);
  } catch (error) {
    response.json(error);
  }
}


module.exports = {
  getAllEmployees,
  createEmployee
}