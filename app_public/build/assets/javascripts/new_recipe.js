var publish_new_recipe = document.getElementById("publish_new_recipe");
var msg_show = document.getElementById("validation");
var msg_close = document.getElementById("validation_close");
var add_ingredient = document.getElementById('addIngredient');

publish_new_recipe.addEventListener('click', function() {
    var msg = "";

    var recipeName = document.getElementById('name');
    var recipePicture = document.getElementById('img');
    var shortDescription = document.getElementById('description');
    var calories = document.getElementById('calories');
    var preparation = document.getElementById('preparation');
    var cooking = document.getElementById('cooking');
    var ingredientList = document.getElementById('ingredientList');
    var preparationInstructions = document.getElementById('instructions');

    if(recipeName.value.length == 0) {
        msg += "Recipe name can't be empty.\n";
    }

    if(!recipePicture.value) {
        msg += "Recipe picture can't be empty.\n";
    }

    if(shortDescription.value.length < 30 || shortDescription.value.length > 300) {
        msg += "Short description must be between 30 and 300 characters long.\n";
    }

    if(!calories.value) {
        msg += "Recipe calories can't be empty.\n";
    } else if(calories.value <= 0) {
        msg += "Calories can't be zero or negative.\n";
    }

    if(!preparation.value) {
        msg += "Preparation time can't be empty.\n";
    } else if(preparation.value <= 0) {
        msg += "Preparation time can't be zero or negative.\n";
    }

    if(!cooking.value) {
        msg += "Cooking time can't be empty.\n";
    } else if(cooking.value <= 0) {
        msg += "Cooking time can't be zero or negative.\n";
    }

    if(ingredientList.childElementCount < 2) {
        msg += "Ingredient list must contain at least 2 items.\n";
    }

    if(preparationInstructions.value.length < 50) {
        msg += "Preparation instructions must be at least 50 characters long.\n";
    }

    if(msg.length != 0) {
        document.getElementById("validation_text").innerText = msg;
        msg_show.style.display = 'block';
        event.preventDefault();
    }
})

msg_close.addEventListener('click', function(){
    msg_show.style.display = 'none';
})

function newElement() {

  function izpolni() {

    var seznam = "";

    var ul = document.getElementById("ingredientList");
    var items = ul.getElementsByTagName("li");

    for(var i = 0; i < items.length; i++) {
      var len = items[i].innerHTML.length;

      seznam += items[i].innerHTML.substring(0, len - 28);

      if(i < items.length-1) {
        seznam += ",";
      }
    }
    var hiddenText = document.getElementById('ingredientsList');
    hiddenText.value = seznam;
  }

    var inputField = document.getElementById("ingredients").value;

    var reg =  new RegExp("^[a-z0-9A-ZčćžđšČĆŽĐŠ . ]*$");

    var sestavineTest = reg.test(inputField);

    if(!sestavineTest) {
        alert("Ingredients can only contain alphanumeric characters and '.'!");
    } else {

        var li = document.createElement("li");

        li.className = "ingredient";

        var inputValue = document.getElementById("ingredients").value;
        var t = document.createTextNode(inputValue);

        li.appendChild(t);
        li.className = "ingredientListItem";

        if (inputValue === '') {
            alert("Can't add an empty ingredient.");
        } else {
            document.getElementById("ingredientList").appendChild(li);
        }

        document.getElementById("ingredients").value = "";

        var span = document.createElement("span");
        var close = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(close);
        li.appendChild(span);

        // Delete li element onclick SPAN(X)
        var closeButtons = document.getElementsByClassName("close");
        for(var i = 0; i < closeButtons.length; i++) {
            closeButtons[i].onclick = function() {
              this.parentElement.remove();
              izpolni();
            }
        }
    }
}

function izpolni() {

    var seznam = "";

    var ul = document.getElementById("ingredientList");
    var items = ul.getElementsByTagName("li");

    for(var i = 0; i < items.length; i++) {
        var len = items[i].innerHTML.length;

        seznam += items[i].innerHTML.substring(0, len - 28);
        if(i < items.length-1) {
          seznam += ",";
        }
    }

    var hiddenText = document.getElementById('ingredientsList');
    hiddenText.value = seznam;
}
