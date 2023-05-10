const Journal = require('../models/Journal');

const getAllJournals = (request, response) => {
  Journal.find().sort({Rank: 'asc'})
    .then( (result) => {
      response.render('journals', {journals: result})
    })
    .catch( (err) => { console.log(err); })
};


const getAllJournalsByQuartile = (request, response) => {
  Journal.find( { SJR_Best_Quartile: { $regex: request.params.quartile,$options:'i' } }).sort({Rank: 'asc'})
    .then( (result) => {
      response.render('journals', {journals: result})
    })
    .catch( (err) => { console.log(err); })
};



module.exports = { getAllJournals, getAllJournalsByQuartile };