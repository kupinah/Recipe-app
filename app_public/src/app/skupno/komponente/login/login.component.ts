import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private usmerjanje: Router,
              private avtentikacijaStoritev: AvtentikacijaService) { }

  private validirajVnos(podatek: string, vrednost: string, pattern: string): boolean {
    var regex = new RegExp(pattern)
    if (!regex.test(vrednost)){
      this.napakaNaObrazcu += podatek ;
      return false;
    }
    return true;
  }

  public napakaNaObrazcu: string = ''

  public pobrisiNapako(): void{
    this.napakaNaObrazcu = ''
  }

  public loadScript(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public prijavniDetajli = {
    location: '',
    about: ''

  }

  public prijavniPodatki = {
    ime:'',
    priimek: '',
    email:'',
    uporabniskoIme: '',
    geslo: '',
    geslo_rep: '',
    details: this.prijavniDetajli
  }

  public izvediRegistracijo(): void {
    this.napakaNaObrazcu = ''
    var valid = true;
    valid = this.validirajVnos('\nFirst name, ', this.prijavniPodatki.ime, '^[a-zA-Z]+$') && valid
    valid = this.validirajVnos('\nSecond name, ', this.prijavniPodatki.priimek, '^[a-zA-Z]+$') && valid
    valid = this.validirajVnos('\nUsername, ', this.prijavniPodatki.uporabniskoIme, '^(?![_.])[a-zA-Z0-9._]+(?<![_.])$') && valid
    valid = this.validirajVnos('\nPassword, ', this.prijavniPodatki.geslo, '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}') && valid
    valid = this.validirajVnos('\nEmail, ', this.prijavniPodatki.email, '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') && valid

    if(!valid){
      this.napakaNaObrazcu = this.napakaNaObrazcu.slice(0, -2);
      this.napakaNaObrazcu = ' Wrong input:\n ' + this.napakaNaObrazcu + '\n';
    }
    if(this.prijavniPodatki.geslo != this.prijavniPodatki.geslo_rep){
      this.napakaNaObrazcu += 'Passwords do not match!';
      valid = false;
    }

    if (
      this.prijavniPodatki.ime &&
      this.prijavniPodatki.email &&
      this.prijavniPodatki.geslo &&
      this.prijavniPodatki.priimek &&
      this.prijavniPodatki.uporabniskoIme &&
      valid
    )
      this.registracija();
  }

  private registracija(): void {
    this.avtentikacijaStoritev
      .registracija(this.prijavniPodatki)
      .pipe(catchError((napaka: HttpErrorResponse) => {
        return throwError(() => napaka);
      })).subscribe(() => {
      this.usmerjanje.navigateByUrl("/");
    });
  }

  public prijava(): void {
    this.avtentikacijaStoritev
      .prijava(this.prijavniPodatki)
      .pipe(catchError((napaka: HttpErrorResponse) => {
          this.napakaNaObrazcu = napaka.toString()
        return throwError(() => napaka);
      })).subscribe(() => {
      this.usmerjanje.navigateByUrl("/");
    });
  }

  private odjava(): void {
    this.avtentikacijaStoritev.odjava();
  }

  ngOnInit(): void {
    this.loadScript("../../../assets/javascripts/login.js");
    this.odjava()
  }
}
