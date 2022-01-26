var apiParametri = {
  streznik: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
  apiParametri.streznik = "https://lp-21-recipes.herokuapp.com";
}
const axios = require("axios")

/* Vrni začetno stran s seznamom lokacij */
// const search = (req, res) => {
//   console.log("KKIKIKIKIKIK")
//   console.log(req.query.name)
//   axios
//     .get(apiParametri.streznik + "/api/searchRecipes", {
//     })
//     .then((odgovor) => {
//       // res.render('search', { search: odgovor.data })
//     })
//     .catch((err) => {
//       console.log("NAPAKA"+ err)
//     });
// };

const seznam = (req, res) => {
  axios
    .get(apiParametri.streznik + "/api/recipes", {
    })
    .then((odgovor) => {
      res.render('index', { seznam: odgovor.data })
      //console.log(JSON.stringify(odgovor.data))
    })
    .catch(() => {
      console.log("NAPAKA")
    });
    axios
};

var seznamRecept = (req, res) => {
  axios
    .get(apiParametri.streznik + "/api/recipes")
    .then((odgovor1) => {
        res.render('my_profile', { seznam: odgovor1.data } )
    });
    
};

var seznamUserInRecept = (req, res) => {
  axios
    .get(apiParametri.streznik + "/api/listCurrentUser")
    .then((odgovor1) => {
      axios
        .get(apiParametri.streznik + "/api/listCurrentRecipes")
        .then((odgovor2) => {
          res.render('my_profile', { seznam: odgovor2.data, user: odgovor1.data[0]})

          //console.log("test1: " + odgovor1.data[0].uporabniskoIme);
          //console.log("test2: " + odgovor2.data[0].userID);

    });  
  });
};

module.exports = {
  seznam,
  seznamRecept,
  seznamUserInRecept,
};