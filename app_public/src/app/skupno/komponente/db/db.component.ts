import { Component, OnInit } from '@angular/core';
import {Recept} from "../../razredi/recept";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../storitve/api.service";
import {Router} from "@angular/router";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private apiService: ApiService, private avtentikacijaService: AvtentikacijaService) { }

  public odjava(): void {

    this.avtentikacijaService
      .odjava();
  }

  public dodajTestneRecepte(): void {

    this.apiService
      .dodajTestneRecepte()
      .subscribe();
  }

  public izbrisiRecepte(): void {

    this.apiService
      .izbrisiRecepte()
      .subscribe();
  }

  public dodajTestneUporabnike(): void {

    this.apiService
      .dodajTestneUporabnike()
      .subscribe();
  }

  public izbrisiUporabnike(): void {

    this.apiService
      .izbrisiUporabnike()
      .subscribe();
  }

  ngOnInit(): void {
    console.log("asd")
  }
}
