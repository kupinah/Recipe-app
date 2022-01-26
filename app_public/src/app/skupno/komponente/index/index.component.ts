import { ChangeDetectorRef, Component, Injectable, Input, OnInit } from '@angular/core';
import { Recept } from '../../razredi/recept';
import { ApiService } from '../../storitve/api.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable, forkJoin, combineLatest, withLatestFrom, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { PovezavaService } from '../../storitve/povezava.service';
import { Api2Service } from '../../storitve/api2.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class IndexComponent implements OnInit {

  constructor(private apiStoritev: ApiService, private tPot: ActivatedRoute, private http: HttpClient, private usmerjevalnik: Router, private povezavaStoritev: PovezavaService,
    private changeDetectorRef: ChangeDetectorRef, private morajudapostojedvazastoneznamalimora: Api2Service
  ) {
  }

  @Input() public recepti: Recept[] = [];
  p: number = 1;
  value: string = "cao"
  public selectedRating = 1;

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }


  public loadScript(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public updateRatingIndex(recept: Recept): void {
    var receptID: string = recept._id
    this.apiStoritev
      .updateRating(receptID, this.selectedRating)
      .subscribe((najdeneRecepte) => {
        this.recepti = najdeneRecepte
      })
    this.selectedRating = 1
  }

  public naslednjaStran(trenutnaStran: number): void {
    var query: string = ((<any>this.tPot.snapshot)._routerState.url)
    var asd = query.split("/")[2]
    if (trenutnaStran < this.p) {
      this.p -= 1
    } else {
      this.p += 1
    }
    this.usmerjevalnik.navigateByUrl("/iskanje/" + asd + "/" + trenutnaStran);
  }


  public searchRecepte(query: string): void {
    this.apiStoritev
      .pridobiRecepte(query)
      .subscribe((najdeneRecepte) => {
        this.recepti = najdeneRecepte;
        alert(this.recepti.length);
      });
  }

  ngOnInit(): void {
    // this.jestenije = this.onoff.status
    // console.log(this.jestenije)
    var lokalni: boolean = true;
    this.tPot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let iskalniNiz: string = (params.get('iskalniNiz') || '').toString();
          let broj: string = (params.get('broj') || '').toString();
          if (iskalniNiz == "") {
            return this.apiStoritev.pridobiRecepte(iskalniNiz)
          } else {
            lokalni = false
            return this.morajudapostojedvazastoneznamalimora.pridobiZunajneRecepte(iskalniNiz, broj);
          }
        })
        //@ts-ignore
      ).subscribe((typeData) => {
        if (lokalni) {
          this.recepti = typeData
          return
        }
        setTimeout(() => {
          this.recepti = typeData.slice(0, 10);
        }, 1500);
      });


    // this.pridobiRecepte();
    // document.getElementById('search-tag').innerHTML = '<div class="d-flex"><input id="ukucaj" class="form-control me-2" type="search" placeholder="Search" name="name" aria-label="Search"><button class="btn btn-outline-success" type="submit" (click)="alert("CAO")"><i class="fas fa-search"></i></button></div>';
  }

}
