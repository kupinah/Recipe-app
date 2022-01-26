import { Component, OnInit } from '@angular/core';
import { details, Users } from '../../razredi/users'
import { ApiService } from '../../storitve/api.service';
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";
import { Recept } from '../../razredi/recept';
import { identity } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private apiStoritev: ApiService,
              private avtentikacijaService: AvtentikacijaService,
              private usmerjanje: Router,) { }
  //public uporabnik: Users = new Users( "", "", "", "", "", this.trenutniDetajli )
  public username: string | undefined = ""


  public detajli: details = new details( "", "" )
  public uporabnik: Users = new Users( "", "", "", "", "", this.detajli )

  public recepti: Recept[] = []

  public obrazecNapaka: string = '';

  private pridobiUsername(){
    this.username =  this.avtentikacijaService.vrniTrenutnegaUporabnika()?.uporabniskoIme;
  }

  private pridobiUserje(): void {
    this.pridobiUsername()
    if(this.username != undefined)
      this.apiStoritev.pridobiUserja(this.username).subscribe((uporabnik) => (this.uporabnik.ime = uporabnik.ime, 
                                                                              this.uporabnik.priimek = uporabnik.priimek, 
                                                                              this.uporabnik.uporabniskoIme = uporabnik.uporabniskoIme,
                                                                              this.uporabnik.email = uporabnik.email
                                                                              ));

    //console.log("type: " + typeof(this.uporabnik))
    //console.log(this.uporabnik)
  }

  private pridobiUserDetails(): void {
    this.pridobiUsername()
    if(this.username != undefined)
      this.apiStoritev.pridobiUserDetails(this.username).subscribe((detajli) => (this.detajli.location = detajli.location,
                                                                                 this.detajli.about = detajli.about
                                                                                ));

    //console.log("type: " + typeof(this.uporabnik))
    //console.log(this.detajli)
  }
/*
  private pridobiUserId(): void {
    this.pridobiUsername()
    if(this.username != undefined)
      this.apiStoritev.pridobiUserId(this.username).subscribe((uporabnik) => (this.uporabnik.ime = uporabnik.ime, 
                                                                              this.uporabnik.priimek = uporabnik.priimek, 
                                                                              this.uporabnik.uporabniskoIme = uporabnik.uporabniskoIme,
                                                                              this.uporabnik.email = uporabnik.email
                                                                              ));

    //console.log("type: " + typeof(this.uporabnik))
    //console.log(this.uporabnik)
  }
*/

  private pridobiUserRecepte(): void {
    this.pridobiUsername()
    this.apiStoritev
      .pridobiRecepteUserja(this.username)
      .subscribe((najdeneRecepte) => (this.recepti = najdeneRecepte, console.log(this.recepti)));
  }

  public trenutenRecept: Recept;

  public posodobiRecept(i: number, id: string): void {


    this.trenutenRecept = this.recepti[i]


    this.apiStoritev
      .posodobiRecept(this.trenutenRecept._id, this.trenutenRecept)
      .subscribe({
        next: (recepti) => {
          //uporabnik.details = this.prijavniDetajli
          //this.usmerjanje.navigateByUrl("/myprofile");
        },
        error: (napaka) => {
          this.obrazecNapaka = napaka;
        },
      })
  }

  public izbrisiRecept(i: number){
    
    this.trenutenRecept = this.recepti[i];
    

    this.apiStoritev  
      .izbrisiRecept(this.trenutenRecept._id)
      .subscribe({
        next: (recepti) => {
          window.location.reload();
        },
        error: (napaka) => {
          this.obrazecNapaka = napaka;
        },
      })
  }
  

  ngOnInit(): void {
    this.pridobiUserje();
    this.pridobiUserDetails();
    this.pridobiUserRecepte();
  }

}
