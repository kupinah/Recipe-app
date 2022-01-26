const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *  schemas:
 *   Details:
 *    type: object
 *    properties:
 *     location:
 *      type: string
 *     about:
 *      type: string
 *   DetailsVracanje:
 *    type: object
 *    properties:
 *     location:
 *      type: string
 *      example: Ljubljana
 *     about:
 *      type: string
 *      example: Moje ime je Greorg
 *    
 */


const detailsSchema = new mongoose.Schema({
  _id: false,
  location: String,
  about: String,
})
/**
 * @swagger
 * components:
 *  schemas:
 *   Uporabnik:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 61d8b85a7782c132f4708256
 *     uporabniskoIme:
 *      type: string
 *      example: jjNovak
 *     email:
 *      type: string
 *      example: janez.novak@gmail.com
 *     ime:
 *      type: string
 *      example: Janez
 *     priimek:
 *      type: string
 *      example: Novak
 *     details:
 *      type: Details
 *      example:
 *       location: Ljubljana
 *       about: Živjo moje ime je Janez.
 *     nakljucna vrednost:
 *      type: Details
 *      example: b32a8e930a8dad47ac91675b063c216c
 *     zgoščena vrednost:
 *      type: Details
 *      example: fae7552dc6829782de3cd9d2fb1149da0b080b8d82ff673ed390e1fc298b6e267873ef59c4d540d8420f83ec6348fa2fd1603c4e6921cd3b8802911c70014de3
 *    required:
 *     - uporabniskoIme
 *     - email
 *     - ime
 *     - priimek
 *     - geslo
 *   UporabnikRegistracija:
 *    type: object
 *    description: Podatki uporabnika za registracijo
 *    properties:
 *     uporabniskoIme:
 *      type: string
 *      example: jjNovak
 *     email:
 *      type: string
 *      example: janez.novak@gmail.com
 *     ime:
 *      type: string
 *      example: Janez
 *     priimek:
 *      type: string
 *      example: Novak
 *     geslo:
 *      type: string
 *      format: password
 *      example: Geslo123
 *     details:
 *      type: Details
 *      example: empty
 *    required:
 *     - uporabniskoIme
 *     - email
 *     - ime
 *     - priimek
 *     - geslo
 *   UporabnikPrijava:
 *    type: object
 *    description: Podatki uporabnika za prijavo
 *    properties:
 *     _id:
 *      type: string
 *      example: 61d879fd1eaa207865369a70
 *     uporabniskoIme:
 *      type: string
 *      description: uporabnisko ime
 *      example: janez.novak@gmail.com
 *     geslo:
 *      type: string
 *      format: password
 *      example: Geslo123
 *    required:
 *     - uporabniskoIme
 *     - geslo
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: uspešna avtentikacija uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ4NzlmZDFlYWEyMDc4NjUzNjlhNzAiLCJ1cG9yYWJuaXNrb0ltZSI6ImpqTm92YWsiLCJpbWUiOiJKYW5leiIsImV4cCI6MTY0MjE4NDY3NCwiaWF0IjoxNjQxNTc5ODc0fQ.OSrnf5DszgUHBnNFtYejTq7sYSqL-d1nHPFT9LGCN5A
 *    required:
 *     - žeton
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Zahtevani so vsi podatki.
 *   UporabnikPosodabljanje:
 *    type: object
 *    description: Spreminjanje podatkov obstoječega uporabnika
 *    properties:
 *     uporabniskoIme:
 *      type: string
 *      example: jjNovi
 *     email:
 *      type: string
 *      example: jani.novi@gmail.com
 *     ime:
 *      type: string
 *      example: Jani
 *     priimek:
 *      type: string
 *      example: Novak
 *     geslo:
 *      type: string
 *      format: password
 *      example: NovoBoljšeGeslo123
 *     details:
 *      type: Details
 *      example:
 *       location: Ljubljana
 *       about: Živjo, moje ime je Janez in jem samo pašto in pizzo :)
 */

const usersShema = new mongoose.Schema({
  uporabniskoIme: {type: String, unique: true, required: true},
  zgoscenaVrednost: { type: String, required: true },
  nakljucnaVrednost : { type: String, required: true },
  email: {type: String, required: true},
  ime: {type: String, required: true},
  priimek: {type: String, required: true},
  details: detailsSchema,
})

usersShema.methods.dodajGeslo = function (geslo) {
  this.nakljucnaVrednost = crypto.randomBytes(16).toString("hex");
  this.zgoscenaVrednost = crypto
      .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, "sha512")
      .toString("hex");
};

usersShema.methods.preveriGeslo = function (geslo) {
  let zgoscenaVrednost = crypto
      .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, "sha512")
      .toString("hex");
  return this.zgoscenaVrednost == zgoscenaVrednost;
};

usersShema.methods.generirajZeton = function () {
  const datumPoteka = new Date();
  datumPoteka.setDate(datumPoteka.getDate() + 7);

  return jwt.sign(
      {
        _id: this._id,
        uporabniskoIme: this.uporabniskoIme,
        ime: this.ime,
        exp: parseInt(datumPoteka.getTime() / 1000),
      },
        process.env.JWT_GESLO
  );
};

mongoose.model("User", usersShema, "Users");