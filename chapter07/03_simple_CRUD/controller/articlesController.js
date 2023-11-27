const Article = require('../model/article');

const { validationResult } = require('express-validator');

// Open web pages routes
const open_add_article_form = (request, response) => {
  response.render('add_article_form', {title: 'Add Article', errors: []});
}

// read functions
const find_articles = (request, response) => {
  let name = request.query.name;
  let code = request.query.code;
  let nameRegex = (name && name.length > 0)? new RegExp(name, 'i') : null;
  let codeRegex = (code && code.length > 0)? new RegExp(code, 'i') : null;
  let search = {};
  if( nameRegex != null && codeRegex != null){
    search = { $or: [ { 'name': { "$regex": nameRegex } },
                      { 'code': { "$regex": codeRegex } }
                    ]};
  }else if(codeRegex != null){
    search = { 'code': { "$regex": codeRegex } };
  } else if(nameRegex != null){
    search = { 'name': { "$regex": nameRegex } };
  } else {
    search = {};
  }
  Article.find(search)
    .then((data) => {
        data = data? data: [];
        response.render('search_articles', {title: "Search Articles", articles: data});
    })
    .catch((err) => { console.log(err) })
};

const get_articles_byID = (request, response) => {
  Article.findById(params.body.id)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => { console.log(err) })
};

const get_articles_byCategory = (request, response) => {
  let category = request.body.category;
  Article.find({ category: category})
    .then((data) => {
      response.send(data);
    })
    .catch((err) => { console.log(err) })
};

// write functions
const add_article = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return  response.render('add_article_form', {title: 'Add Article', errors: errors.array()});
  }

  let name = request.body.name;
  let code = request.body.code;
  let description = request.body.description;

  if(response._closed != true){
    let art = new Article({ name: name, code: code, description: description });
    art.save()
      .then((data) => {
        console.log(`Article saved to database: id -> ${data._id}`);
        response.redirect('/v1/articles/add');
      })
      .catch((err) => { console.log(err) });
  }
  
};

const update_article = (request, response) => {
  const filter = { id: request.params.id }; 
  const update = {  code: request.params.code,
                    name: request.params.name,
                    desc:request.params.desc
                  }; 
  
  Article.findOneAndUpdate(filter, update)
    .then((result) => {
      console.log(`Article updated from database: id -> ${result._id}`);
      response.json({ redirect: '/v1/articles/search'});
    })
    .catch((err) => { console.log(err) });
};

const delete_article = (request, response) => {
  let id = request.params.id;

  Article.findByIdAndDelete(id)
    .then((result) => {
      console.log(`Article deleted from database: id -> ${result._id}`);
      response.json({ redirect: '/v1/articles/search'});
    })
    .catch((err) => { console.log(err) });
};

module.exports = {open_add_article_form,
                  find_articles, get_articles_byID, get_articles_byCategory, 
                  add_article, update_article, delete_article
                };