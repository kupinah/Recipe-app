const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");

const avtentikacija = jwt({
    secret: process.env.JWT_GESLO,
    userProperty: "payload",
    algorithms: ["HS256"],
});

const ctrlDapp = require("../controllers/dapp");
const ctrlUsers = require("../controllers/users");
const ctrlAvtentikacija = require("../controllers/avtentikacija");



/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

// Branje uporabnikov
router.get("/users", ctrlUsers.userList);
/**
 * @swagger
 *  /users:
 *   get:
 *    summary: Pridobivanje vseh uporabnikov
 *    description: Pridobivanje vseh uporabnikov ki so v bazi.
 *    tags: [Users]
 *    
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z vsemi uporabnikom.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Uporabnik"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 */


// Urejanje detajlov uporabnika
router.put("/updateUsers/:username", avtentikacija, ctrlUsers.updateUsers);
/**
 * @swagger
 *  /updateUsers/{username}:
 *   put:
 *    summary: Spreminjanje podatkov uporabnika
 *    description: Spreminjanje podatkov trenutno prijavljenega uporabnika.
 *    parameters:
 *     - in: path
 *       name: username
 *       description: uporabniško ime trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         uporabniskoIme:
 *          type: string
 *         ime:
 *          type: string
 *         priimek:
 *          type: string
 *         location:
 *          type: string
 *         details:
 *          type: array
 *        example:
 *         uporabniskoIme: jjNovak
 *         ime: Gregor
 *         priimek: Horvat
 *         details:
 *          about: Moj ime je Greogr.
 *          location: Ljubljana
 *         email: greorhrovat@mail.vcom
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Uspešno spremenjeni podatki.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Uporabnik"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */


// Spreminjanje gesla -> STARA METODA, KI SE JE NE UPORABLJA VEČ
router.post("/updatePassword/:username", ctrlUsers.updatePassword)

// Brisanje vseh uporabnikov
router.delete("/dropUsers", ctrlUsers.dropUsers);
/**
 * @swagger
 *  /dropUsers:
 *   delete:
 *    summary: Brisanje uporabnikov
 *    description: Brisanje vseh uporabnikov.
 *    tags: [Users]
 *    responses:
 *     "204":
 *      description: Uspešno odstranjevanje uporabnikov.
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 */

// Branje trenutno prijavljenjega uporabnika -> STARA METODA, KI SE JE NE UPORABLJA VEČ
router.get("/listCurrentUser", ctrlUsers.listCurrentUser);


// pridobivanje trenutno prijavljenega uporabnika
router.get("/getUser/:username", avtentikacija, ctrlUsers.getUser);
/**
 * @swagger
 *  /getUser/{username}:
 *   get:
 *    summary: Pridobivanje trenutnega uporabnika
 *    description: Pridobivanje uporabnika, ki je trenutno prijavljen.
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: username
 *       description: uporabniško ime trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s trenutnim uporabnikom.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Uporabnik"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */


// Pridobivanje detejlov trenutno prijavljenega uporanika
router.get("/getUserDetails/:username", avtentikacija, ctrlUsers.getUserDetails);
/**
 * @swagger
 *  /getUserDetails/{username}:
 *   get:
 *    summary: Pridobivanje detajlov trenutnega uporabnika
 *    description: Pridobivanje detaljov uporabnika, ki je trenutno prijavljen.
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: username
 *       description: uporabniško ime trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z detajli trenutnim uporabnikom.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/DetailsVracanje"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access. 
 */

// Dodajanje testnega uporabnika
router.post("/testUsers", ctrlUsers.addTestUsers);
/**
 * @swagger
 *  /testUsers:
 *   post:
 *    summary: Dodajanje testnega uporabnika
 *    description: Dodajanje novega testnega uporabnika v bazo.
 *    tags: [Users]
 *    responses:
 *     "201":
 *      description: Uspešna dodan uporabnik.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         example: OK
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 */

//Brisanje uporabnika z uporabniskim imenom (admin page)
router.delete("/deleteUser/:username", avtentikacija, ctrlUsers.deleteUser);
/**
 * @swagger
 *  /deleteUser/{username}:
 *   delete:
 *    summary: Brisanje določenega uporabnika
 *    description: Brisanje uporabnika s pomočjo uporabniškega imena.
 *    parameters:
 *     - in: path
 *       name: username
 *       description: uporabniško ime trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    responses:
 *     "204":
 *      description: Uspešno odstranjevanje uporabnika.
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */

// Brisanje recepta z ID (admin page)
router.delete("/deleteRecipe/:_id", avtentikacija, ctrlUsers.deleteRecipe);
/**
 * @swagger
 *  /deleteRecipe/{_id}:
 *   delete:
 *    summary: Brisanje določenega recepta
 *    description: Brisanje recepta s pomočjo enoličnega identifikatorja.
 *    parameters:
 *     - in: path
 *       name: _id
 *       description: enolični identifikator recepta
 *       schema:
 *        type: string
 *       required: true
 *       example: 61d8a562d15637cf456609e4
 *    tags: [Recipes]
 *    security:
 *     - jwt: []
 *    responses:
 *     "204":
 *      description: Uspešno odstranjevanje recepta.
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */

// Prikaz vseh identifikatorjev receptov -> STARA METODA, KI SE JE NE UPORABLJA VEČ
router.get("/listAllRecipeIDs", ctrlUsers.listAllRecipeIDs);

// Branje trenutnege uporabnika -> STARA METODA, KI SE JE NE UPORABLJA VEČ
router.get("/listCurrentUser", ctrlUsers.listCurrentUser);

// Dodajanje novega recepta
router.post("/recipes/:username", avtentikacija, ctrlUsers.createRecipe);
/**
 * @swagger
 *  /recipes/{username}:
 *   post:
 *    summary: Ustvarjanje novega recepta
 *    description: Ustavrjanje novega recepta, kamor se shranu tudi uporabiško ime uporabnika, ki je ustvaril recept.
 *    parameters:
 *     - in: path
 *       name: username
 *       description: ID trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         userID:
 *          type: string
 *         name:
 *          type: string
 *         description:
 *          type: string
 *         img:
 *          type: string
 *         preparation:
 *          type: number
 *         cooking:
 *          type: number
 *         instructions:
 *          type: string
 *         ingredientsList:
 *          type: array
 *         calories:
 *          type: array
 *        example:
 *         userID: jjNovak
 *         name: Salmon
 *         description: Salmon
 *         img: 
 *         preparation: 10
 *         cooking: 10
 *         instructions: Skuhaj
 *         ingredientsList:
 *          - Salmon
 *          - Water
 *         calories:
 *          servings: 1
 *          calories: 150
 *    tags: [Recipes]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s trenutnim seznamom receptov.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/DodajanjeRecepta"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */


// Branje vseh receptov
router.get("/recipes", ctrlUsers.recipeList);
/**
 * @swagger
 *  /recipes:
 *   get:
 *    summary: Pridobivanje receptov
 *    description: Pridobivanje trenutni seznam receptov.
 *    tags: [Recipes]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s trenutnim seznamom receptov.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/DodajanjeRecepta"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 */


// Brisanje vseh receptov
router.delete("/dropRecipes", ctrlUsers.dropRecipes);
/**
 * @swagger
 *  /dropRecipes:
 *   delete:
 *    summary: Brisanje receptov
 *    description: Brisanje vseh uporabnikov iz baze.
 *    tags: [Recipes]
 *    responses:
 *     "204":
 *      description: Uspešno odstranjevanje receptov.
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 */


// Dodajanje testnih receptov
router.post("/testRecipes", ctrlUsers.addTestRecipes);
/**
 * @swagger
 *  /testRecipes:
 *   post:
 *    summary: Dodajanje testnega recepta
 *    description: Dodajanje novega testnega recepta v bazo.
 *    tags: [Recipes]
 *    responses:
 *     "201":
 *      description: Uspešna dodan uporabnik.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         example: OK
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 */


// Searchovanje receptov -> STARA METODA, KI SE JE NE UPORABLJA VEČ
router.get("/searchRecipes/:name", ctrlUsers.searchRecipes);


// Spreminjanje podatkov recepta
router.post("/updateRecipe/:id", avtentikacija, ctrlUsers.updateRecipe);
/**
 * @swagger
 *  /updateRecipe/{id}:
 *   post:
 *    summary: Spreminjanje trenutnega recepta
 *    description: Spreminjanje podatkov trenutno označenega recepta.
 *    parameters:
 *     - in: path
 *       name: id
 *       description: enolični identifikator trenutnega recepta
 *       schema:
 *        type: string
 *       required: true
 *       example: 61d9e06738a4072e96798099
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *         description:
 *          type: string
 *         preparation:
 *          type: number
 *         cooking:
 *          type: Number
 *         instructions:
 *          type: string 
 *         calories:
 *          type: Calories  
 *        example:
 *         name: Kruh
 *         description: Bel kruh
 *         preparation: 4
 *         cooking: 40
 *         instructions: v pečico
 *         calories:
 *          servings: 13
 *          calories: 69
 *    tags: [Recipes]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Uspešno spremenjeni podatki recepta.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/DodajanjeRecepta"
 *     "404":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */


//Branje receptov trenutnega uporabnika
router.get("/listCurrentRecipes/:username", avtentikacija, ctrlUsers.listCurrentRecipes)
/**
 * @swagger
 *  /listCurrentRecipes/{username}:
 *   get:
 *    summary: Pridobivanje receptov uporabnika
 *    description: Pridobivanje seznam receptov trenutnega uporabnika.
 *    parameters:
 *     - in: path
 *       name: username
 *       description: uporabniško ime trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    tags: [Recipes]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s trenutnim seznamom receptov uporabnika.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/DodajanjeRecepta"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */

//Brisanje receptov trenutnega uporabnika -> STARA METODA, KI SE JE NE UPORABLJA VEČ
router.delete("/deleteCurrentRecipe", ctrlUsers.deleteCurrentRecipe)


//ratanje receptov
router.put("/rateRecipe", avtentikacija, ctrlUsers.rateRecipe);
/**
 * @swagger
 *  /rateRecipe:
 *   put:
 *    summary: Ocenjevanje receptov
 *    description: Ocenjevanje določenega recepta.
 *    tags: [Recipes]
 *    security:
 *     - jwt: []
 *    responses:
 *     "201":
 *      description: OK
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/DodajanjeRecepta"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access.
 */

/* Avtentikacija */
router.post("/registracija", ctrlAvtentikacija.registracija);
/**
 * @swagger
 *  /registracija:
 *   post:
 *    summary: Registracija
 *    description: Ustavrjanje novega uporabiškega računa.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ime:
 *          type: string
 *         priimek:
 *          type: string
 *         email:
 *          type: string
 *         uporabniskoIme:
 *          type: string
 *         geslo:
 *          type: string
 *         geslo_rep:
 *          type: string
 *        example:
 *         ime: Gregor
 *         priimek: Novak
 *         email: ggovak@mail.com
 *         uporabniskoIme: gNovak
 *         geslo: Geslo123
 *         geslo_rep: Geslo123
 *    tags: [Users]
 *    responses:
 *     "201":
 *      description: Uspešna zahteva za registracijo.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/DodajanjeRecepta"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Manjkajoči podatki.
 */


router.post("/prijava", ctrlAvtentikacija.prijava);
/**
 * @swagger
 *  /prijava:
 *   post:
 *    summary: Prijava
 *    description: Prijava z uporabniškim imenom in geslom.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         uporabniskoIme:
 *          type: string
 *         geslo:
 *          type: string
 *        example:
 *         uporabniskoIme: jjNovak
 *         geslo: Geslo123
 *    tags: [Users]
 *    responses:
 *     "201":
 *      description: Uspešna prijava.
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *        properties:
 *         žeton:
 *          type: string
 *        example:
 *         žeton: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ4YTk2ZTI3MDczNjgyMDk2YTlhMzMiLCJ1cG9yYWJuaXNrb0ltZSI6ImpqTm92YWsiLCJpbWUiOiJKYW5leiIsImV4cCI6MTY0MjE5NDU2OCwiaWF0IjoxNjQxNTg5NzY4fQ.jpSDRu01fp2OCilaRUUvlLJHWrqaYe-wkYzUBLK-CNI
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Please input your username and password.
 */


/* Branje ABI pametne pogodbe dodajanja receptov */
router.get("/abi-recepti", ctrlDapp.preberiABIPametnePogodbeDodajanjaReceptov);
/**
 * @swagger
 *  /abi-recepti:
 *   get:
 *    summary: Branje pametne pogodbe
 *    description: Branje pametne pogodbe.
 *    tags: [Recipes]
 *    responses:
 *     "200":
 *      description: Uspešno branje pametne pogodbe.
 *     "404":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        example:
 *         sporočilo: Napaka pri branju ABI pametne pogodbe za licitacijo!
 */


// spremeni geslo trenutnega uporabnika
router.put("/spremeniGeslo/:username", avtentikacija, ctrlUsers.spremeniGeslo);
/**
 * @swagger
 *  /spremeniGeslo/{username}:
 *   put:
 *    summary: Spreminjanje gesla
 *    description: Spreminjanje gesla trenutnega uporabnika.
 *    parameters:
 *     - in: path
 *       name: username
 *       description: uporabniško ime trenutnega uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: jjNovak
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         staro_geslo:
 *          type: string
 *         geslo:
 *          type: string
 *        example:
 *         staro_geslo: Geslo123
 *         geslo: Pass1234
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    responses:
 *     "201":
 *      description: Uspešno spremenjeno geslo.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Uporabnik"
 *     "400":
 *      description: Napaka zahteve.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napka.
 *     "401":
 *      description: Unauthorized napaka.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Unauthorized Access
 */

module.exports = router;