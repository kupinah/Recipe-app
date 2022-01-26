let pogodba;
const gasLimit = 200000;
const provider = {
  server: "sensei.lavbic.netlocalhost",
  port: 8545,
};

export const vrniUporabnika = async () => {
  if(typeof window.ethereum !== "undefined") {
    // Poveži se na MetaMask
    const racuni = await ethereum.request({ method: "eth_requestAccounts" });
    return racuni[0];
  } else return null;
}

export const dodajRecept = async (idRecepta) => {
  let naslovUporabnika = await vrniUporabnika();

  if(idRecepta != undefined) {
    try {
      await pogodba.dodajRecept(idRecepta, {
        from: naslovUporabnika,
        gasPrice: 20000000000,
        gas: gasLimit
      });
      console.log("Recept uspešno dodan v verigo blokov.");
      return true;
    } catch (napaka) {
      console.log("Zgodila se je napaka pri dodajanju recepta v verigo blokov." + napaka);
      return false;
    }
  } else {
    console.log("Zgodila se je napaka pri branju podatkov.");
    return false;
  }
}

export const web3namestiPogodbo = async (pogodbaABI) => {
  try {
    let recepti = await TruffleContract(pogodbaABI);
    recepti.setProvider(window.ethereum);

    pogodba = await recepti.deployed({
      from: await vrniUporabnika(),
      gas: gasLimit,
    });

    if (pogodba) console.log("Uspešno nameštena pogodba.");
    else console.log("Napaka pri namestitvi pogodbe.");
  } catch (err) {
    console.log(err);
  }
}
