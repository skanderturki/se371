
const getAllCountries = async (request, response) => {
  const countries = await Country.findAll();
  response.status(200).json({ countries: countries });
}

const createCountry = async (request, response) => {
  const { name } = request.body;
  const newCountry = Country.build({ "name": name });

  try {
    await newCountry.save();
    response.status(201).json(newCountry);
  } catch (error) {
    response.json(error);
  }
}

module.exports = {
  getAllCountries,
  createCountry
}