(async function Recipe() {

    // Knjižnice
    const { exec } = require("child_process");
    const {execSync} = require("child_process");
    const {describe, it, after, before} = require("mocha");
    const {Builder, By} = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    let aplikacijaUrl = "https://lp-21-recipes.herokuapp.com"
    //let aplikacijaUrl = "http://localhost:4200";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require("axios").create({
        baseURL: aplikacijaUrl + "api/",
        timeout: 5000,
    });

    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVSekundah, xpath) => {
        await brskalnik.wait(
            () => {
                return brskalnik.findElements(By.xpath(xpath)).then((elementi) => {
                    return elementi[0];
                });
            },
            casVSekundah * 1000,
            `Stran se ni naložila v ${casVSekundah} s.`
        );
    };

    try {
        before(() => {
            brskalnik = new Builder()
                .forBrowser("chrome")
                .setChromeOptions(
                    new chrome.Options()
                        .addArguments("start-maximized")
                        .addArguments("disable-infobars")
                        .addArguments("allow-insecure-localhost")
                        .addArguments("allow-running-insecure-content")
                )
                .usingServer(seleniumStreznikUrl)
                .build();
        });

        describe("DB", function() {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl+"/db");
            });

            context("recepti", async() => {
                it("brisanje receptov", async () => {
                    await pocakajStranNalozena(brskalnik, 30, "//button[contains(text(), 'Insert')]");

                    let delete_r = await brskalnik.findElement(By.id("izbrisiRecepte"));
                    expect(delete_r).to.not.be.empty;
                    delete_r.click();
                });

                it("dodajanje receptov", async() => {
                    let add_recipes = await brskalnik.findElement(By.id("dodajRecepte"));
                    expect(add_recipes).to.not.be.empty;
                    add_recipes.click();
                })
            })

            context("users", async() => {
                it("brisanje uporabnikov", async () => {
                    await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Insert')]");

                    let delete_user = await brskalnik.findElement(By.id("izbrisiUsera"));
                    delete_user.click();
                });

                it("dodajanje uporabnikov", async() => {
                    let add_user = await brskalnik.findElement(By.id("dodajUsera"));
                    add_user.click();
                })
            })
        })

        describe("Main page", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("število receptov na začetni strani", async () => {
                await pocakajStranNalozena(brskalnik, 20, "//img");
                let recepti = await brskalnik.findElements(By.className("card"));
                await new Promise(resolve => setTimeout(resolve, 3000));
                expect(recepti).to.be.an("array").to.have.lengthOf(3);
            });

            context("išči recepte", async() => {
                it("vnos podatkov", async function() {
                    let searchRecipe = await brskalnik.findElement(
                        By.id("ukucaj"));
                    expect(searchRecipe).to.not.be.empty;
                    await searchRecipe.sendKeys("salmon")
                });

                it("filtriraj", async() => {
                    let search = await brskalnik.findElement(By.id("btnSearch"))
                    expect(search).to.not.be.empty;
                    await search.click();
                    await pocakajStranNalozena(brskalnik, 10, "//img");
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    let recepti = await brskalnik.findElements(By.className("card"));
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    expect(recepti).to.be.an("array").to.have.lengthOf(10);
                })
            })

        })

        describe("Register page", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            context("dodajanje novega uporabnika", async() => {
                it("prijavna stran", async() => {
                    await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'Log in')]")

                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Log in')]"));
                    expect(povezava).to.not.be.empty;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await povezava.click();
                });

                it("izbira registracije", async() => {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Create')]")
                    );
                    expect(povezava).to.not.be.empty;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await povezava.click();
                });

                it("registracija uporabnika", async () => {
                    await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'Already have')]");

                    let ime = await brskalnik.findElement(By.css("input[name='tbIme']"));
                    expect(ime).to.not.be.empty;
                    ime.sendKeys("Janez");

                    let priimek = await brskalnik.findElement(By.css("input[name='tbPriimek']"))
                    expect(priimek).to.not.be.empty;
                    priimek.sendKeys("Kranjski")

                    let email = await brskalnik.findElement(By.css("input[name='tbMail']"));
                    expect(email).to.not.be.empty;
                    email.sendKeys("janez@kranjski.net");

                    let uporabniskoIme = await brskalnik.findElement(By.id("tbUsernameP"));
                    expect(uporabniskoIme).to.not.be.empty;
                    uporabniskoIme.sendKeys("janezkranjski");

                    let geslo = await brskalnik.findElement(By.id("tbGesloP"));
                    expect(geslo).to.not.be.empty;
                    geslo.sendKeys("Test123.");

                    let gesloPon = await brskalnik.findElement(By.css("input[name='tbGesloPon']"));
                    expect(gesloPon).to.not.be.empty;
                    gesloPon.sendKeys("Test123.");

                    let close = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Sign up')]"))
                    await brskalnik.executeScript("arguments[0].scrollIntoView()", close);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await close.click();
                })
            })

            context("prijava uporabnika", async() => {
                it("odpiranje menija", async() => {
                    await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'janezkranjski')]");
                    let user = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'janezkranjski')]"));
                    expect(user).to.not.be.empty;
                    await user.click()
                });

                it("odjava uporabnika", async() => {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Logout')]"));
                    expect(povezava).to.not.be.empty;
                    await povezava.click()
                })

                it("vnos podatkov", async() => {
                    await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'Create new')]");

                    let username = await brskalnik.findElement(By.css("input[name='tbUsername']"));
                    expect(username).to.not.be.empty;
                    await username.sendKeys("janezkranjski");

                    let geslo = await brskalnik.findElement(By.css("input[name='tbGeslo']"));
                    expect(geslo).to.not.be.empty;
                    await geslo.sendKeys("Test123.")

                    let close = await brskalnik.findElement(By.id("btnLogin"))
                    await brskalnik.executeScript("arguments[0].scrollIntoView()", close);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await close.click();
                })
            })
        })

        describe("Calculators page", function(){
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("odpri stran", async() => {
                await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'Calories')]")

                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Calories')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });

            it("calculate bmi", async() => {
                let kg = await brskalnik.findElement(By.css("input[name='tbWeight']"));
                expect(kg).to.not.be.empty;
                await kg.sendKeys("90");

                let cm = await brskalnik.findElement(By.css("input[name='tbHeight']"));
                expect(kg).to.not.be.empty;
                await cm.sendKeys("196")

                let age = await brskalnik.findElement(By.css("input[name='tbAge']"));
                expect(age).to.not.be.empty;
                await age.sendKeys("21")

                let calc = await brskalnik.findElement(By.id("calc_btn"));
                await brskalnik.executeScript("arguments[0].scrollIntoView()", calc);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await calc.click();

                let close = await brskalnik.findElement(By.id("validacija_close"))
                await new Promise(resolve => setTimeout(resolve, 1000));
                await close.click();
            })

            it("calculate calories", async() => {
                let kg = await brskalnik.findElement(By.css("input[name='tbWeight']"));
                await kg.clear()
                await kg.sendKeys("90");

                let cm = await brskalnik.findElement(By.css("input[name='tbHeight']"));
                await cm.clear()
                await cm.sendKeys("196")

                let age = await brskalnik.findElement(By.css("input[name='tbAge']"));
                await age.clear()
                await age.sendKeys("21")

                let sex = await brskalnik.findElement(By.id("ddlSex"));
                await sex.sendKeys("Male")

                let activity = await brskalnik.findElement(By.id("activity"));
                await activity.sendKeys("Very Active (hard exercise/sports 6-7 days/week)")

                let calc_cal = await brskalnik.findElement(By.xpath("//button[contains(text(), 'calories')]"))
                await brskalnik.executeScript("arguments[0].scrollIntoView()", calc_cal);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await calc_cal.click()

                let close = await brskalnik.findElement(By.id("validacija_close"))
                await new Promise(resolve => setTimeout(resolve, 1000));
                await close.click();
            })
        })

        describe("Edit profile page", function() {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("odpiranje menija", async() => {
                await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'janezkranjski')]");
                let user = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'janezkranjski')]"));
                expect(user).to.not.be.empty;
                await user.click()
            });

            it("izbira edit profile", async() => {
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Edit Profile')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click()
            })

            it("sprememba vrednosti", async() => {
                let ime = await brskalnik.findElement(By.id("userIme"))
                expect(ime).to.not.be.empty;
                await ime.clear()
                await ime.sendKeys("Marko")

                let details = await brskalnik.findElement(By.id("send_btn_details"));
                await brskalnik.executeScript("arguments[0].scrollIntoView()", details);
                await new Promise(resolve => setTimeout(resolve, 1500));
                await details.click();
            })
        })

        /* HIDDEN DUE TO DAPPS
        describe("Newrecipe page", function(){
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            context("priprava strani", async() => {
                it("odpiranje menija", async() => {
                    await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'janezkranjski')]")

                    let user = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'janezkranjski')]"));
                    expect(user).to.not.be.empty;
                    await user.click()
                });

                it("izbira newrecipe", async() => {
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'New recipe')]"));
                    expect(povezava).to.not.be.empty;
                    await povezava.click()
                })
            })

            context("dodajanje recepta", async() => {
                it("dodaj podatke", async() => {
                    let ime = await brskalnik.findElement(By.css("input[name='name']"));
                    expect(ime).to.not.be.empty;
                    await ime.sendKeys("Ćevapi");

                    let slika = await brskalnik.findElement(By.id("img"));
                    expect(slika).to.not.be.empty;
                    await slika.sendKeys(process.cwd() + "/test/cevapi.jpg");

                    let opis = await brskalnik.findElement(By.css("textarea[name='description']"));
                    expect(opis).to.not.be.empty;
                    await opis.sendKeys("Najboljša jed na svetu, OMG, skoraj tako dobro kot burek");

                    let kolicina = await brskalnik.findElement(By.css("select[name='servings']"));
                    expect(kolicina).to.not.be.empty;
                    await kolicina.sendKeys("3")

                    let kalorije = await brskalnik.findElement(By.css("input[name='calories']"));
                    expect(kalorije).to.not.be.empty;
                    await kalorije.clear()
                    await kalorije.sendKeys("400")

                    let priprava = await brskalnik.findElement(By.css("input[name='preparation']"));
                    expect(priprava).to.not.be.empty;
                    await priprava.clear()
                    await priprava.sendKeys("400")

                    let cas = await brskalnik.findElement(By.id("cooking"));
                    expect(cas).to.not.be.empty;
                    await cas.clear()
                    await cas.sendKeys("30")

                    let dodajanje = await brskalnik.findElement(By.xpath("//span[contains(text(), 'Add')]"))
                    let sestavine = await brskalnik.findElement(By.id("ingredients"));
                    expect(sestavine).to.not.be.empty;
                    await sestavine.sendKeys("Čebula");
                    await dodajanje.click();
                    await sestavine.clear()
                    await sestavine.sendKeys("Meso")
                    await dodajanje.click();

                    let navodila = await brskalnik.findElement(By.id("instructions"));
                    expect(navodila).to.not.be.empty;
                    await navodila.sendKeys("Veliko ljubezni, ljubezni, ljubezni, malo znanja, znanja, znanja, malo volje, volje, volje.")

                    let publish = await brskalnik.findElement(By.id("publish_new_recipe"))
                    await brskalnik.executeScript("arguments[0].scrollIntoView()", publish);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await publish.click()
                })
            })
        })*/

        describe("Aboutus page", function(){
            it("odpri stran", async() => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await pocakajStranNalozena(brskalnik, 20, "//a[contains(text(), 'About')]")
                let povezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'About')]"))
                expect(povezava).to.not.be.empty;
                await povezava.click()
            })

            it("posreduj podatke", async() => {
                let ime = await brskalnik.findElement(By.css("input[name='ime']"))
                expect(ime).to.not.be.empty;
                ime.sendKeys("Ana Brnabić");

                let mail = await brskalnik.findElement(By.css("input[name='email_nme']"))
                expect(ime).to.not.be.empty;
                mail.sendKeys("ana@brnabic.gov");

                let message = await brskalnik.findElement(By.id("comment_nme"))
                expect(message).to.not.be.empty;
                message.sendKeys("Najjača spletna stran, super ste!!!")

                let btn = await brskalnik.findElement(By.id("send_btn"))
                await brskalnik.executeScript("arguments[0].scrollIntoView()", btn);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await btn.click()
            })
        })

        after(async () => {
            brskalnik.quit();
        });
    }
    catch
    {
        console.log("Prišlo je do napake");
    }
})();
