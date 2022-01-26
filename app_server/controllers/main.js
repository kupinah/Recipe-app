
var main = (req, res) =>{
    res.render('index')
}
var calculator = (req, res) =>{
    res.render('calculator')
}
var aboutus = (req, res) =>{
    res.render('about_us')
}
var editprofile = (req, res) =>{
    res.render('edit_profile')
}
var myprofile = (req, res) =>{
    res.render('my_profile')
}
var newrecipe = (req, res) =>{
    res.render('new_recipe')
}
var login = (req, res) => {
    res.render('login')
}
var db = (req, res) => {
    res.render('db')
}

module.exports = {
    main,
    login,
    calculator,
    aboutus,
    editprofile,
    myprofile,
    newrecipe,
    db,
}