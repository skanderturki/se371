const express = require('express');
const articlesController = require('../controller/articlesController');

const { check } = require('express-validator');

const router = express.Router();


// Open page routes
router.get('/add', articlesController.open_add_article_form);
router.get('/search', articlesController.find_articles);

// read routes
router.get('/', articlesController.find_articles);
router.get('/id/:id', articlesController.get_articles_byID);
router.get('/category/:category', articlesController.get_articles_byCategory);

// write routes
router.post('/', [ check('name').isLength({ min: 3 }), 
                      check('code').isLength({ min: 2 }) ]
                  , articlesController.add_article
            );

router.put('/id/:id/code/:code/name/:name/desc/:desc', articlesController.update_article);
router.delete('/:id', articlesController.delete_article);



module.exports = router;