const passport = require("passport");
const LokalnaStrategija = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
    new LokalnaStrategija(
        {
            usernameField: "uporabniskoIme",
            passwordField: "geslo",
        },
        (uporabniskoIme, geslo, pkKoncano) => {
            User.findOne(
                { uporabniskoIme: uporabniskoIme },
                (napaka, uporabnik) => {
                    if (napaka) return pkKoncano(napaka);
                    if (!uporabnik)
                        return pkKoncano(null, false, {
                            sporočilo: "Napačno uporabniško ime.",
                        });
                    if (!uporabnik.preveriGeslo(geslo))
                        return pkKoncano(null, false, { sporočilo: "Napačno geslo." });
                    return pkKoncano(null, uporabnik);
                }
            );
        }
    )
);