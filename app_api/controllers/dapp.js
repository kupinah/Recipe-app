const abiPogodbe = require('../../app_dapp/build/contracts/DodajanjeReceptov.json');

const preberiABIPametnePogodbeDodajanjaReceptov = (req, res) => {
    if (abiPogodbe)
        res.status(200).json(abiPogodbe);
    else
        res.status(404).json({"sporočilo": "Napaka pri branju ABI pametne pogodbe za licitacijo!"});
};


module.exports = {
    preberiABIPametnePogodbeDodajanjaReceptov
};