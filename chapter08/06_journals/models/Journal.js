const mongoose = require('mongoose');

const journalSchema = mongoose.Schema(
  {
    _id: { type: Number},
    Rank: { type: Number},
    Sourceid: { type: String},
    Title: { type: String},
    Type: { type: String},
    Issn: { type: String},
    SJR: { type: String},
    SJR_Best_Quartile: { type: String},
    H_index: { type: String},
    Total_Docs_2021: { type: String},
    Total_Docs_3years: { type: String},
    Total_Refs: { type: String},
    Total_Cites_3years: { type: String},
    Citable_Docs_3years: { type: String},
    Cites_Doc_2years: { type: String},
    Ref_Doc: { type: String},
    Country: { type: String},
    Region: { type: String},
    Publisher: { type: String},
    Coverage: { type: String},
    Categories: { type: String}
  }
);

module.exports = mongoose.model('Journal', journalSchema);