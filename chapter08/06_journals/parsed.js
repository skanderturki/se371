const filename = "./data/scimagojr_2021_Western_Europe.csv";
const Journal = require('./models/Journal');

const csv = require('csv-parse');
const fs = require('fs');

const parser = fs.createReadStream(filename).pipe(
  csv.parse({ columns: true, relax_quotes: true, escape: '\\', ltrim: true, rtrim: true, delimiter: ';'})
)

const records = [];

parser.on('readable', function() {
  let record;
  while ((record = parser.read()) !== null) {
    if( record.Type.toLowerCase() == "journal" 
        //&& ( record.SJR_Best_Quartile == "Q4" || record.SJR_Best_Quartile == "Q3" )
       //&& parseInt(record.Rank) < 500 
      ){
        let j = new Journal({
            _id: Math.floor(Math.random() * 100000000000) + 1,
            Rank: parseInt(record.Rank),
            Sourceid: record.Sourceid,
            Title: record.Title,
            Type: record.Type,
            Issn: record.Issn,
            SJR: record.SJR,
            SJR_Best_Quartile: record.SJR_Best_Quartile,
            H_index: record.H_index,
            Total_Docs_2021: record.Total_Docs_2021,
            Total_Docs_3years: record.Total_Docs_3years,
            Total_Refs: record.Total_Refs,
            Total_Cites_3years: record.Total_Cites_3years,
            Citable_Docs_3years: record.Citable_Docs_3years,
            Cites_Doc_2years: record.Cites_Doc_2years,
            Ref_Doc: record.Ref_Doc,
            Country: record.Country,
            Region: record.Region,
            Publisher: record.Publisher,
            Coverage: record.Coverage,
            Categories: record.Categories
        });
        records.push(j);
      }
  }
});

parser.on('error', function(err) {
  console.error(err.message);
});

parser.on('end', function() {
  //console.log(records);
  console.log(`Data loaded, we found ${records.length} records`);
});

module.exports = records;