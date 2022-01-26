import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BranjeJsonService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public preberiJsonDatoteko(): Observable<any> {

    const url: string = `${this.apiUrl}/abi-recepti`;

    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      () =>
        `Prišlo je do napake '${napaka.status}' z opisom '${napaka.error.sporočilo || napaka.statusText
        }'`
    );
  }
}