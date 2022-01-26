
// EDIT DETAILS
var validacija_vnosa_details = function(){

    alert_msg = ''

// Preverjanje za vnos First name
    var ime_vnos = document.getElementsByName('ime_input_field')[0]
    var dolzina_imena = ime_vnos.value.length;

    if ((ime_vnos.value).length != 0) {
        if (dolzina_imena > 25) {
            alert_msg += "First name is too long!\n"
        }
    }

// Preverjanje za vnos Second name
    var priimek_vnos = document.getElementsByName('priimek_input_field')[0]
    var dolzina_priimka = priimek_vnos.value.length;

    if ((priimek_vnos.value).length != 0) {    
        if (dolzina_priimka > 25) {
            alert_msg += "Second name is too long!\n"
        }
    }

// Preverjanje za vnos Location
    var lokacija_vnos = document.getElementsByName('lokacija_input_field')[0]
    var lokacija_dolzina = lokacija_vnos.value.length;

    if (lokacija_dolzina != 0) {
        if (lokacija_dolzina < 3) {
            alert_msg += "Location:\n - min 3 characters!\n"
        }
    }

// Preverjanje za vnos About
    var about_vnos = document.getElementsByName('about')[0]
    var about_dolzina = about_vnos.value.length;

    if (about_dolzina != 0) {
        if (about_dolzina > 300) {
            alert_msg += "About:\n - max 300 characters!\n"
        }
    }

// Preverjanje za vnos Email
    var email_vnos = document.getElementsByName('mail_input_field')[0];
    var email_regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if ((email_vnos.value).length != 0) {
        if(!email_regEx.test(email_vnos.value)){
            alert_msg += "Invalid email address!\n"
        }
    }

// Preverjanje za vnos Username
    var username_vnos = document.getElementsByName('username_input_field')[0];
    var username_pattern = username_vnos.getAttribute("pattern")
    var username_regEx = new RegExp(username_pattern)

    if ((username_vnos.value).length != 0) {
        if (username_vnos.value.length < 5 || username_vnos.value.length > 20) {
            alert_msg += "Username must be 5-20 long!\n"
        }
        
        if(!username_regEx.test(username_vnos.value)){
            alert_msg += "Invalid username!\n"
        }
    }

    return alert_msg    
}

var posljipodatke_details = document.getElementById('send_btn_details');
var sporocilo_show = document.getElementById("validacija")
var sporocilo_close = document.getElementById("validacija_close")

posljipodatke_details.addEventListener('click', function(){
    
    var sporocilo = validacija_vnosa_details()
    if(sporocilo != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
        event.preventDefault()
    }
    
})

// CHANGE PASSWORD
var validacija_vnosa_geslo = function(){
    alert_msg = ''

    var geslo_vnos = document.getElementsByName('novo_geslo_prvic_input_field')[0]
    var geslo_pattern = geslo_vnos.getAttribute("pattern")
    var geslo_regex = new RegExp(geslo_pattern)
    if(!geslo_regex.test(geslo_vnos.value))
        alert_msg += "New password has to contain:\n - 8-20 characters,\n - 1 lowercase,\n - 1 uppercase,\n - 1 digit!\n"

    
    var ponovno_geslo_vnos = document.getElementsByName('novo_geslo_drugic_input_field')[0]
    if(!(geslo_vnos.value == ponovno_geslo_vnos.value))
        alert_msg += "Passwords are not the same!"
        
    return alert_msg
}

var posljipodatke_geslo = document.getElementById('send_btn_geslo');
posljipodatke_geslo.addEventListener('click', function(){
    
    var sporocilo2 = validacija_vnosa_geslo()
    if(sporocilo2 != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo2
        sporocilo_show.style.display = 'block'
        event.preventDefault()
    }
    
})

sporocilo_close.addEventListener('click', function(){
    sporocilo_show.style.display = 'none'
})


// CHANGE PHOTO
var validacija_slike = function() {

    alert_msg = ''

    var vnos_slike = document.getElementById('naloziSliko')

    if (vnos_slike.files.length == 0) {
        alert_msg = "If you want to change your profile picture, upload the photo!"
    }
    return alert_msg
}


var posljipodatke_slika = document.getElementById('change_photo');
posljipodatke_slika.addEventListener('click', function(){
    
    var sporocilo3 = validacija_slike()

    if(sporocilo3 != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo3
        sporocilo_show.style.display = 'block'
        event.preventDefault();
    }
    
})

sporocilo_close.addEventListener('click', function(){
    sporocilo_show.style.display = 'none'
})