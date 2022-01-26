const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const registracija = (req, res) => {
    if (!req.body.ime || !req.body.email || !req.body.geslo)
        return res.status(400).json({ sporočilo: "Manjkajoči podatki." });
    const uporabnik = new User();
    uporabnik.ime = req.body.ime;
    uporabnik.email = req.body.email;
    uporabnik.uporabniskoIme = req.body.uporabniskoIme;
    uporabnik.priimek = req.body.priimek;
    uporabnik.details = {
        "location": "",
        "about": ""
    }
    uporabnik.dodajGeslo(req.body.geslo);


    uporabnik.save((napaka) => {
        if (napaka) {
            res.status(500).json(napaka);
        }
        else {
            res.status(200).json({ žeton: uporabnik.generirajZeton() });
        }
    });
};

const prijava = (req, res) => {
    if (!req.body.uporabniskoIme || !req.body.geslo)
        return res.status(400).json({ sporočilo: "Please input your username and password." });
    passport.authenticate("local", (napaka, uporabnik, informacije) => {
        if (napaka) return res.status(500).json(napaka);
        if (uporabnik) res.status(200).json({ žeton: uporabnik.generirajZeton() });
        else res.status(401).json(informacije);
    })(req, res);
};

module.exports = {
    registracija,
    prijava,
};