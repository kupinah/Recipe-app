var login_form = document.getElementsByClassName("one")[0]
var reg_form = document.getElementsByClassName("two")[0]
var reg_h = document.getElementById("register_new")

reg_h.addEventListener('click', function (e){
    e.preventDefault();
    var visibility_status = reg_form.style.visibility;
    if(visibility_status == 'hidden' || visibility_status == ''){
        reg_form.style.visibility = 'visible'
        login_form.style.visibility = 'hidden'
    }
    else{
        reg_form.style.visibility = 'hidden'
        login_form.style.visibility = 'visible'
    }
})

var validirajvnos = function(){
    var sporocilo = ""
    //email validator
    var email_field = document.getElementsByName('tbMail')[0]
    var email_pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    var email_regex = new RegExp(email_pattern)
    if(!email_regex.test(email_field.value))
        sporocilo += "Invalid email address!\n"

    //username validator
    var username_field = document.getElementsByName('tbUsername')[1]
    var username_pattern = username_field.getAttribute("pattern")
    var username_regex = new RegExp(username_pattern)
    if(!username_regex.test(username_field.value))
        sporocilo += "Invalid username!\n"

    //password validator
    var geslo_field = document.getElementsByName('tbGeslo')[1]
    var geslo_pattern = geslo_field.getAttribute("pattern")
    var geslo_regex = new RegExp(geslo_pattern)
    if(!geslo_regex.test(geslo_field.value))
        sporocilo += "Password has to contain: 8-20 characters; at least 1 lowercase, 1 uppercase and 1 digit!\n"

    //password2 validator
    var gesloRep_field = document.getElementsByName('tbGesloPon')[0]
    if(!(geslo_field.value == gesloRep_field.value))
        sporocilo += "Passwords are not the same!"
    return sporocilo
}

var posljipodatke = document.getElementById('signup_btn')
var sporocilo_show = document.getElementById("validacija")
var sporocilo_close = document.getElementById("validacija_close")

posljipodatke.addEventListener('click', function(){
    /*var sporocilo = validirajvnos()
    if(sporocilo != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
    }*/
})

sporocilo_close.addEventListener('click', function(){
    sporocilo_show.style.display = 'none'
})



