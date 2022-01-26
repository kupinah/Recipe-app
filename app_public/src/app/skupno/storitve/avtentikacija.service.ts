import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from "../razredi/shramba";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Users } from '../razredi/users';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { ApiService } from '../storitve/api.service';

@Injectable({
  providedIn: 'root'
})
export class AvtentikacijaService {

  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
              private apiService: ApiService) { }

  public prijava(uporabnik: Users): Observable<RezultatAvtentikacije> {
    return this.apiService.prijava(uporabnik).pipe(
      tap((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije['žeton']);
      })
    );
  }

  public jeAdmin(): boolean {
    var user = this.vrniTrenutnegaUporabnika();
    if(user && user.uporabniskoIme == "jjNovak")
      return true;
    return false;
  }

  public registracija(uporabnik: Users): Observable<RezultatAvtentikacije> {
    return this.apiService.registracija(uporabnik).pipe(
      tap((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije['žeton']);
      })
    );
  }

  public odjava(): void {
    this.shramba.removeItem('žeton');
  }

  public jePrijavljen(): boolean {
    const zeton: string | null = this.vrniZeton();
    if (zeton) {
      const koristnaVsebina = JSON.parse(atob(zeton.split('.')[1]));
      return koristnaVsebina.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public vrniTrenutnegaUporabnika(): Users | null {
    if (this.jePrijavljen()) {
      const zeton: string | null = this.vrniZeton();
      if (zeton) {
        const { uporabniskoIme, ime } = JSON.parse(
          atob(zeton.split('.')[1])
        );
        //console.log("UI "+)
        //console.log("ime "+ atob(zeton.split('.')[1]))
        return { uporabniskoIme, ime }  as Users;
      }
    }
    return null;
  }

  public vrniZeton(): string | null {
    return this.shramba.getItem('žeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('žeton', zeton);
  }
}
