import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { calories, Recept, ingredients } from '../razredi/recept';
import { catchError, merge, Observable, retry, throwError } from 'rxjs';
import { RezultatAvtentikacije } from "../razredi/rezultat-avtentikacije";
import { details, Users } from '../razredi/users';
import { of } from 'rxjs';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _id: string = '';
  private username: string = '';

  constructor(private http: HttpClient, @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage) { }
  private baseAPIurl = environment.apiUrl

  public pridobiSearchRecepte(query: string): Observable<Recept[]> {
    var url: string = `${this.baseAPIurl}`;
    setTimeout(() => {
      if (query != "") {
        url = this.baseAPIurl + "/searchRecipes/" + query;
      }

    }, 2000);
    return this.http.get<Recept[]>(url)
  }

  public pridobiRecepte(query: string): Observable<Recept[]> {
    var url: string = `${this.baseAPIurl}`+"/recipes";
    return this.http.get<Recept[]>(url)
  }

  // public pridobiRecepteRating(receptID: string, selectedRating: number): Observable<Recept[]> {
  //   var url: string = `${this.baseAPIurl}`;
  //   console.log(this.updateRating(receptID, selectedRating))
  //   return this.http.get<Recept[]>(url)
  // }


  public updateRating(receptID: string, selectedRating: number): Observable<Recept[]> {
    const body = { skrito: receptID, rating: selectedRating };
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };
    // post ali put?
    return this.http.put<Recept[]>(this.baseAPIurl + "/rateRecipe", body, httpLastnosti)
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      () =>
        `${napaka.error.sporočilo || napaka.statusText}`
    );
  }

  public prijava(uporabnik: Users): Observable<RezultatAvtentikacije> {
    return this.avtentikacija('prijava', uporabnik);
  }

  public registracija(uporabnik: Users): Observable<RezultatAvtentikacije> {
    return this.avtentikacija('registracija', uporabnik);
  }

  public pridobiUserja(username: string): Observable<Users> {
    const url: string = this.baseAPIurl + "/getUser/" + username;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http
      .get<Users>(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public pridobiRecepteUserja(username: string): Observable<Recept[]> {
    const url: string = this.baseAPIurl + "/listCurrentRecipes/" + username;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http
      .get<Recept[]>(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public posodobiRecept(id: string, recept: Recept): Observable<Recept> {

    const url: string = this.baseAPIurl + "/updateRecipe/" + id;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };


    return this.http.post<Recept>(url, recept, httpLastnosti).pipe(retry(1), catchError(this.obdelajNapako));

  }
  /*
    public pridobiUserId(username: string): Observable<Users> {
      const url: string = 'http://localhost:3000/api/getUserId/' + username;
      console.log(url)
  
      return this.http
        .get<Users>(url)
        .pipe(retry(1), catchError(this.obdelajNapako));
    }
  */
  public pridobiUserDetails(username: string): Observable<details> {
    const url: string = this.baseAPIurl + "/getUserDetails/" + username;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http
      .get<details>(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public posodobiUporabnika(username: string, uporabnik: Users): Observable<Users> {
    const url: string = this.baseAPIurl + "/updateUsers/" + username;

    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http.put<Users>(url, uporabnik, httpLastnosti).pipe(retry(1), catchError(this.obdelajNapako));
  }

  private avtentikacija(
    urlNaslov: string,
    uporabnik: Users
  ): Observable<RezultatAvtentikacije> {
    const url: string = this.baseAPIurl + "/" + `${urlNaslov}`;
    return this.http
      .post<RezultatAvtentikacije>(url, uporabnik)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public dodajNovRecept(podatkiObrazca: Recept, username: string): Observable<Recept> {

    const url: string = this.baseAPIurl + "/recipes/" + username;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http
      .post<Recept>(url, podatkiObrazca, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public dodajTestneRecepte() {

    const url: string = this.baseAPIurl + "/testRecipes";

    return this.http
      .post(url, null)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public izbrisiRecepte() {

    const url: string = this.baseAPIurl + "/dropRecipes";

    return this.http
      .delete(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public dodajTestneUporabnike() {

    const url: string = this.baseAPIurl + "/testUsers";
    return this.http
      .post(url, null)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public izbrisiUporabnike() {

    const url: string = this.baseAPIurl + "/dropUsers";

    return this.http
      .delete(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public izbrisiUporabnika(podatkiObrazca: any) {

    this.username = podatkiObrazca.username;

    const url: string = `${this.baseAPIurl}/deleteUser/${this.username}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http
      .delete(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public izbrisiRecept(podatkiObrazca: any) {

    this._id = podatkiObrazca.id;
    const url: string = `${this.baseAPIurl}/deleteRecipe/${podatkiObrazca.id}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http
      .delete(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public prikaziVseIdReceptov(podatkiObrazca: any): Observable<any> {

    const url: string = this.baseAPIurl + "/listAllRecipeIDs";

    return this.http
      .get<any>(url, podatkiObrazca)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public spremeniGeslo(username: string, uporabnik: Users): Observable<Users> {

    const url: string = this.baseAPIurl + "/spremeniGeslo/" + username;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('žeton')}`,
      }),
    };

    return this.http.put<Users>(url, uporabnik, httpLastnosti).pipe(retry(1), catchError(this.obdelajNapako));

  }
}
