// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./BokkyPooBahsDateTimeLibrary.sol";

contract DodajanjeReceptov {

    using BokkyPooBahsDateTimeLibrary for uint;

    uint today = block.timestamp;

    uint year;
    uint month;
    uint day;

    struct Recept {
        string id;
        address lastnik;
    }
    
    address public skrbnik;

    Recept[] public recepti;

    event ReceptDodajDogodek(address lastnik, string idRecepta);

    constructor() {

        skrbnik = msg.sender;
        (year, month, day) = BokkyPooBahsDateTimeLibrary.timestampToDate(today);
    }

    function dodajRecept(string memory idRecepta) public {

        recepti.push(
            Recept({
                id: idRecepta,
                lastnik: msg.sender
            })
        );

        emit ReceptDodajDogodek(msg.sender, idRecepta);
    }

    function vrniRecepteLastnika(address lastnik) public view returns(Recept[] memory) {

        uint numOfRecipes;

        for(uint i; i < recepti.length; i++) {
            if(recepti[i].lastnik == lastnik) {
                numOfRecipes++;
            }
        }

        Recept[] memory receptiLastnika = new Recept[](numOfRecipes);
        uint ix;

        for(uint i; i < recepti.length; i++) {
            if(recepti[i].lastnik == lastnik) {
                receptiLastnika[ix] = recepti[i];
                ix++;
            }
        }

        return receptiLastnika;
    }
}