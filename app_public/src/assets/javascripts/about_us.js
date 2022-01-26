var validirajMail = function(){
    alert_msg = ''

    var email_vnos = document.getElementsByName('email_nme')[0]
    var email_pattern = email_vnos.getAttribute("pattern")
    var email_regEx = new RegExp(email_pattern)

    if(!/^$/.test(email_vnos.value)) {
        if(!email_regEx.test(email_vnos.value)){
            alert_msg += "Invalid Email adress!"
        }
    }

    var st_znakov = document.getElementsByName('nme')[0]
    if(st_znakov.value.length > 25){
        alert_msg += "Name too long!"
    }

    var dolzina_besedila = document.getElementsByName('text')[0].value
    if(dolzina_besedila.length > 300){
        alert_msg += "Comment is too long!"
    }
    

    return alert_msg

}

var posljipodatke = document.getElementById('send_btn')
var sporocilo_show = document.getElementById("validacija")
var sporocilo_close = document.getElementById("validacija_close")
posljipodatke.addEventListener('click', function(){
    var sporocilo = validirajMail()
    if(sporocilo != ''){
        var sporocilo_text = document.getElementById("validacija_text")
        sporocilo_text.innerText = sporocilo
        sporocilo_show.style.display = 'block'
    }
})

sporocilo_close.addEventListener('click', function(){
    sporocilo_show.style.display = 'none'
})