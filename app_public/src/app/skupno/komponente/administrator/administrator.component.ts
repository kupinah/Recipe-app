import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../storitve/api.service";

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  public _id: any = {
    "id": ''
  };

  public podatki: any = {
    "username": ''
  }

  public izbrisiUporabnika(): void {

    this.apiService
      .izbrisiUporabnika(this.podatki)
      .subscribe();
  }

  public izbrisiRecept(): void {

    this.apiService
      .izbrisiRecept(this._id)
      .subscribe();
  }

  public list: any = {
  }

  public prikaziVseIdReceptov(): void {

    this.apiService
      .prikaziVseIdReceptov(this.list)
      .subscribe( list => {
          this.list = JSON.stringify(list);
        },
        (error) => {
          console.log("err", error);
        });
  }

  public prikaziText(): void {
    var text = document.getElementById('allRecipes');
    text.style.width = '100%';
    text.style.height = '150px';
    text.className = 'text-center';
    text.style.display = 'block';
  }

  ngOnInit(): void {
    this.prikaziVseIdReceptov();
  }

}
