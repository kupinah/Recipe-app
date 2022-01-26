const axios = require('axios');

var apiParams = {
    server: "http://localhost:" + (process.env.PORT || 3000),
};

if (process.env.NODE_ENV === "production") {
    apiParams.server = "https://lp-21-recipes.herokuapp.com";
}

var seznamUser = (req, res) => {
    axios
        .get(apiParams.server + "/api/users")
        .then((odgovor) => {
            res.render('my_profile', 
                odgovor.data[0])

        });
};

var seznamUser_edit = (req, res) => {
    axios
        .get(apiParams.server + "/api/listCurrentUser")
        .then((odgovor) => {
            res.render('edit_profile', 
                odgovor.data[0])

        });
};

module.exports = {
    seznamUser,
    seznamUser_edit,
}