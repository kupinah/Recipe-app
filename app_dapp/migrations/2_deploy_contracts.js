let DodajanjeReceptov = artifacts.require("DodajanjeReceptov");

module.exports = (postavitev) => {
    postavitev.deploy(DodajanjeReceptov);
};