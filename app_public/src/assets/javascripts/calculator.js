var bmi_button = document.getElementById('calc_btn')
var calories_btn = document.getElementById('calories_btn')
var sporocilo_show = document.getElementById("validacija")
var sporocilo_close = document.getElementById("validacija_close")

bmi_button.addEventListener('click', function(){
    var sporocilo = validator()
    if(sporocilo != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
    }
    else{
        var sporocilo_text = document.getElementById("validacija_text")
        var kgs =  document.getElementById("tbWeight").value
        var cms =  document.getElementById("tbHeight").value/100
        var modal_title = document.getElementsByClassName("modal-title")[0]
        modal_title.innerText = "BMI value"
        var bmi = Math.round(kgs/(cms*cms))
        sporocilo = "Your BMI is: " + bmi + "."
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
    }
})

calories_btn.addEventListener('click', function(){
    var sporocilo = validator()
    if(sporocilo != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
    }
    else{
        var sporocilo_text = document.getElementById("validacija_text")
        var kgs =  document.getElementById("tbWeight").value
        var cms =  document.getElementById("tbHeight").value
        var age = document.getElementById("tbAge").value
        var sex = document.getElementById("ddlSex").value
        var act = document.getElementById("activity").value
        console.log(act)
        var modal_title = document.getElementsByClassName("modal-title")[0]
        var bmr = ""
        var amr = ""
        if(sex == "first")
            bmr =  Math.round(655.1 + (9.563 * kgs) + (1.850 * cms) - (4.676 * age))
        else
            bmr =  Math.round(66.47 + (13.75 * kg) + (5.003 * cms) - (6.755 * age))
        switch(act) {
            case "1":
                amr = bmr * 1.2
                break;
            case "2":
                amr = bmr * 1.375
                break;
            case "3":
                amr = bmr * 1.55
                break;
            case "4":
                amr = bmr * 1.725
                break;
            default:
                amr = bmr * 1.9
        }
        modal_title.innerText = "Calories calculator"
        sporocilo = "Daily calories intake for maintaining weight is " + Math.round(amr) + "."
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
    }
})

var validator = function(){
    var sporocilo = ""
    var weight_in = document.getElementById('tbWeight').value
    var height_in = document.getElementById('tbHeight').value
    var age_in = document.getElementById('tbAge').value

    if(weight_in < 40 || weight_in > 200)
        sporocilo += "Weight (in kg) should be between 40kg and 200kg\n"
    if(height_in < 70 || height_in > 230)
        sporocilo += "Height (in cm) should be between 70cm and 230cm\n"
    if(age_in < 10 || age_in > 110)
        sporocilo += "Age should be between 10 and 110\n"
    return sporocilo
}

sporocilo_close.addEventListener('click', function(){
    sporocilo_show.style.display = 'none'
})
