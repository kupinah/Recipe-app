async function funkcija() {
    var x = document.getElementById("ukucaj").value;
    if (x.length == 0) {
        alert("Can't search with empty input")
    } else {
        var b = document.querySelector(".zasrc");
        console.log(b)
        var re = new RegExp(x.toUpperCase())
        var s = b.querySelectorAll(".recept")
        for (const element of s) {
            element.style.display = "inline"
        }
        for (const element of s) {
            var a = element.innerText
            a = a.replace("Show recipe", "").toUpperCase();
            if (!re.test(a)) {
                // console.log(a)
                element.style.display = "none"
            }
        }
        recipe_api = await recipe_call(x)
        var template = document.getElementById("myTemplate");
        var i = 1000
        for (var recipe of recipe_api.hits) {
            recipe = recipe.recipe
            ok = template.querySelectorAll(".recept")
            console.log(ok)
            ok[0].children[0].src = recipe.image
            ok[0].children[1].firstElementChild.innerText = recipe.label
            ok[0].children[2].children[0].children[0].children[0].children[0].innerHTML = recipe.label
            ok[0].children[2].children[0].children[0].children[1].children[0].innerHTML = "<b>Total time: </b>" + recipe.totalTime
            ok[0].children[2].children[0].children[0].children[1].children[1].innerHTML = "<b>Calories: </b>" + recipe.calories
            ok[0].children[2].children[0].children[0].children[1].children[2].innerHTML = "<b>Servings: </b>" + recipe.yield
            ok[0].children[2].children[0].children[0].children[1].children[3].innerHTML = "<b>Ingredients: </b>" + recipe.ingredientLines.join()
            ok[0].children[2].children[0].children[0].children[1].children[4].innerHTML = "<b>Recipe by: </b>" + recipe.source
            ok[0].children[2].attributes[1].nodeValue = "myModal" + i
            ok[0].children[1].children[1].attributes[2].nodeValue = "#myModal" + i
            b.appendChild(ok[0].cloneNode(true))
            i = i + 1
        }

    }
}


async function recipe_call(query) {
    var luka1 = "46253edf"
    var luka2 = "83a7a322e63288b2779b8d96d0c3efc4"
    const result = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${luka1}&app_key=${luka2}`);
    const resultjson = await result.json();
    return resultjson
};