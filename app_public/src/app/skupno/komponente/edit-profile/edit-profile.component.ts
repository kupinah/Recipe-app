import { Component, OnInit } from '@angular/core';
import { details, Users } from '../../razredi/users'
import { ApiService } from '../../storitve/api.service';
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public obrazecNapaka: string = '';

  constructor(private apiStoritev: ApiService,
    private avtentikacijaService: AvtentikacijaService, private usmerjanje: Router,) { }
    //public uporabnik: Users = new Users( "", "", "", "", "", this.trenutniDetajli )
    public username: string | undefined = ""

    public uporabnik: Users = new Users( "", "", "", "", "", new details( "", "" ) )

    private pridobiUsername(){
      this.username =  this.avtentikacijaService.vrniTrenutnegaUporabnika()?.uporabniskoIme;
    }

    private pridobiUserje(): void {
      this.pridobiUsername()
      if(this.username != undefined)
      this.apiStoritev.pridobiUserja(this.username).subscribe((uporabnik) => (

        this.prijavniPodatki.ime = uporabnik.ime,
        this.prijavniPodatki.priimek = uporabnik.priimek,
        this.prijavniPodatki.email = uporabnik.email,
        this.prijavniPodatki.uporabniskoIme = uporabnik.uporabniskoIme,
        this.prijavniPodatki.details.about = uporabnik.details.about,
        this.prijavniPodatki.details.location = uporabnik.details.location
      ));
    }

    public alertMessage: string = ""

    public prijavniPodatki = {
      ime:'',
      priimek: '',
      email:'',
      uporabniskoIme: '',
      geslo: '',
      geslo_rep: '',
      staro_geslo: '',
      details: {
        location: '',
        about: ''
      }
    }

    private validirajVnos(podatek: string, vrednost: string, pattern: string): boolean {
      var regex = new RegExp(pattern)
      if (!regex.test(vrednost)){
        this.obrazecNapaka += podatek ;
        return false;
      }
      return true;
    }

    public pobrisiNapako(): void{
      this.obrazecNapaka = ''
    }

    public spremeniPodatkeUserja(): void {

      this.obrazecNapaka = ''
      var valid = true;

      valid = this.validirajVnos('\nFirst name, ', this.prijavniPodatki.ime, '^[a-zA-Z]+$') && valid
      valid = this.validirajVnos('\nSecond name, ', this.prijavniPodatki.priimek, '^[a-zA-Z]+$') && valid
      valid = this.validirajVnos('\nEmail, ', this.prijavniPodatki.email, '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') && valid

      if (this.prijavniPodatki.ime.length > 25) {
        valid = false;
        this.obrazecNapaka += "\nFirst name can not be longer than 25 characters,\n"
      }
      if (this.prijavniPodatki.priimek.length > 25) {
        valid = false;
        this.obrazecNapaka += "\nSecond name can not be longer than 25 characters,\n"
      }
      if (this.prijavniPodatki.details.location.length != 0) {
        if (this.prijavniPodatki.details.location.length < 3) {
          valid = false;
          this.obrazecNapaka += "\nLocation must be longer than 3 characters,\n"
        }
      }  
      if (this.prijavniPodatki.details.about.length != 0) {
        if (this.prijavniPodatki.details.about.length > 300) {
          valid = false;
        this.obrazecNapaka += "\nAbout can not be longer than 300 characters,\n"
        }
      }

      if(!valid){
        this.obrazecNapaka = ' Wrong input:\n ' + this.obrazecNapaka + '\n';
      }

      if (this.prijavniPodatki.ime && this.prijavniPodatki.priimek && this.prijavniPodatki.email && valid) {
        this.apiStoritev
        .posodobiUporabnika(this.username, this.prijavniPodatki)
        .subscribe({
          next: (uporabnik) => {
            
            this.usmerjanje.navigateByUrl("/myprofile");

          },
          error: (napaka) => {
            this.obrazecNapaka = napaka;
          },
        })
      }
    }
    
    public spremeniGeslo(): void {
      this.obrazecNapaka = ""
      var regexGeslo = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')

      if (!regexGeslo.test(this.prijavniPodatki.geslo)) {
          this.obrazecNapaka += " New passwords is not valid. "
      }
      else {
        if (this.prijavniPodatki.geslo != this.prijavniPodatki.geslo_rep) {
          this.obrazecNapaka += " New passwords do not match. "
        }
        else if (this.prijavniPodatki.geslo && this.prijavniPodatki.geslo_rep) {
          this.alertMessage = " Saving changes... Please wait. "
          setTimeout(()=>{
            this.alertMessage = "";
            this.apiStoritev
              .spremeniGeslo(this.username, this.prijavniPodatki)
              .subscribe({
                next: (uporabnik) => {
                  this.avtentikacijaService.odjava();
                  this.usmerjanje.navigateByUrl("/login");
                },
                error: (napaka) => {
                  this.obrazecNapaka = napaka;
                },
              })
            this.obrazecNapaka = " Old password not valid!"
          }, 5000);
        }
        else {
          this.obrazecNapaka = " Fill new password & repeat new password."
        }
      }
    }

    ngOnInit(): void {
      this.pridobiUserje();
    }
}