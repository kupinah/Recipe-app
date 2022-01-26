var express = require('express');
var router = express.Router();
const ctrlOsnovno = require('../controllers/main');
const ctrlRecipes = require('../controllers/recipes');
const ctrlUser = require('../controllers/users');

/* GET home page. */
// router.get('/search', ctrlRecipes.search)
router.get('/login', ctrlOsnovno.login);
router.get('/calculator', ctrlOsnovno.calculator)
router.get('/about_us', ctrlOsnovno.aboutus)
router.get('/edit_profile', ctrlUser.seznamUser_edit)
router.get('/my_profile', ctrlRecipes.seznamUserInRecept)
router.get('/new_recipe', ctrlOsnovno.newrecipe)
router.get('/db', ctrlOsnovno.db)
router.get('/', ctrlRecipes.seznam) 

module.exports = router;
