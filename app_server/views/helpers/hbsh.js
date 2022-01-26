const hbs = require("hbs");

hbs.registerHelper("zvezdice", (ocena) => {
  let zvezdice = "";
  for (let i = 1; i <= 5; i++)
    zvezdice += '<i class="fa' + (ocena >= i ? "s" : "r") + ' fa-star checked"></i>';
  return zvezdice;
});

hbs.registerHelper("slika", (obj1, obj2) => {

  var s = "src = data:";

  s += obj1;

  s += ";base64,";

  s += obj2;

  return s;
});