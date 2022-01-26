const { assert } = require("chai");

const Recepti = artifacts.require("./DodajanjeReceptov.sol");

contract("Recepti", (racuni) => {
    it("Dodajanje in branje dodanega recepta.", async () => {
        // Arrange
        let recepti = await Recepti.deployed();
        try {
            // dodamo recept iz naslova racun[1]
            await recepti.dodajRecept("qwerty", { from: racuni[1] });
            // preberemo recepte lastnika z naslovom racun[1]
            var memory = await recepti.vrniRecepteLastnika(racuni[1], { from: racuni[1] });
            // ce funkcija vrniRecepteLastnika vrne neprazen niz, uspesen test
            assert.isTrue(memory.length !== 0);
        } catch (napaka) {
            assert.isTrue(false);
        }
    });
});

contract("Recepti", (racuni) => {
    it("Dodajanje in branje dodanega recepta.", async () => {
        // Arrange
        let recepti = await Recepti.deployed();
        // ta racun ne obstaja
        var address = "0x7572856891b72A8A63008604cc9dAF7Ea6B0a349";
        var memory = [];
        try {
            // poskusimo dodati recept iz racuna, ki ne obstaja, zgodi se napaka
            await recepti.dodajRecept("qwerty", { from: address });
            // ce bi se zgornja vrstica izvedla, bi memory imel 1 element
            memory = await recepti.vrniRecepteLastnika(address, { from: address });
            assert.isTrue(false);
        } catch (napaka) {
            // memory ima 0 elementov, kar je true
            assert.isTrue(memory.length === 0);
        }
    });
});