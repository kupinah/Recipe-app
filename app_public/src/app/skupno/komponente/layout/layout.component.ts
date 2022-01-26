import { Component, OnInit } from '@angular/core';
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";
import { Router, ActivatedRoute, ParamMap, Route } from "@angular/router";
import { ApiService } from '../../storitve/api.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Observer, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})


export class LayoutComponent implements OnInit {

  public ime: any;
  public jepr: boolean;

  public jePrijavljen(): boolean {
    this.ime = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    if (this.ime != null) {
      this.jepr = true
      return true;
    }
    else
      this.jepr = false
    return false;
  }

  public jeIndex(): boolean {
    var str: string = ((<any>this.tPot.snapshot)._routerState.url);
    if (str == "/" || str.includes("/iskanje/")) {
      return true
    }
    return false
  }

  public funk(): any {
    var query = (<HTMLInputElement>document.getElementById('ukucaj')).value
    this.usmerjevalnik.navigateByUrl("/iskanje/" + query + "/1");
  }



  constructor(private avtentikacijaStoritev: AvtentikacijaService, private usmerjevalnik: Router,
    public tPot: ActivatedRoute, private apiStoritev: ApiService, private povezavaStoritev: PovezavaService
  ) {}
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  ngOnInit(): void {
  }
}
