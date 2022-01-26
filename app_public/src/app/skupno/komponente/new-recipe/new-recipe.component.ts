import {Component, OnInit} from '@angular/core';
import {calories, ingredients, Recept} from "../../razredi/recept";
import {ApiService} from "../../storitve/api.service";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";
import { ViewEncapsulation } from '@angular/core';
import Web3 from 'web3';
import { BranjeJsonService } from '../../storitve/branje-json.service';

import {
  dodajRecept,
  web3namestiPogodbo
} from '../../../../assets/javascripts/recepti-web3';

//declare let require: any;
declare let window: any;
declare var ethereum: any;

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NewRecipeComponent implements OnInit {
  _id: string;
  username: string;

  constructor(private apiService: ApiService, private avtentikacijaService: AvtentikacijaService, private branjeJsonService: BranjeJsonService) { }

  public obrazecNapaka: string = '';
  public ethNaslov: string = '';

  public loadScript(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public slika: any = "";

  public ingredients: ingredients = {
    ingredientsList: ""
  }

  public calories: calories = {
    calories: 1,
    servings: 1
  }

  public novRecept: Recept = {
    _id: "",
    userID: "",
    name: "",
    img: "",
    description: "",
    preparation: 0,
    cooking: 0,
    instructions: "",
    stars: [],
    avg: 0,
    ingredients: this.ingredients,
    calories: this.calories

  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.slika = reader.result;
    };
  }

  private soPodatkiUstrezni(): boolean {
    let ustrezno: boolean = false;
    if (
      this.novRecept.userID &&
      this.novRecept.name &&
      this.novRecept.img &&
      this.novRecept.description &&
      this.novRecept.preparation &&
      this.novRecept.cooking &&
      this.novRecept.instructions &&
      this.novRecept.ingredients &&
      this.novRecept.calories
    ) {
      ustrezno = true;
    }
    return ustrezno;
  }

  public dodajNovRecept(): void {

    this.obrazecNapaka = '';
    this.novRecept.userID = this.avtentikacijaService.vrniTrenutnegaUporabnika()?.uporabniskoIme;
    this.novRecept.img = this.slika;
    this.ingredients.ingredientsList = (<HTMLInputElement>document.getElementById("ingredientsList")).value.toString();

    if(this.soPodatkiUstrezni()) {

      this.apiService
        .dodajNovRecept(this.novRecept, this.avtentikacijaService.vrniTrenutnegaUporabnika()?.uporabniskoIme)
        .subscribe((recept: Recept) => {
          this._id = JSON.stringify(recept);
          // dodajanje v verigo blokov
          let jeUspesno: boolean;

          dodajRecept(this._id.replace(/"/g,"")).then(res => { 
            
            jeUspesno = res;

            if(!jeUspesno) {
              this.apiService
                .izbrisiRecept(this._id.replace(/"/g,""))
                .subscribe({
                  next: (recepti) => {
                    window.location.reload();
                  },
                  error: (napaka) => {
                    this.obrazecNapaka = napaka;
                  },
                })
            } 
          });

        });
    } else {
      this.obrazecNapaka = 'Zahtevani so vsi podatki, prosim poskusite ponovno!';
      alert(this.obrazecNapaka);
    }
  }

  vrniUporabnika = async (): Promise<string> => {
    if (typeof window.ethereum !== "undefined") {
      // Poveži se na MetaMask
      const racuni: any = await ethereum.request({method: "eth_requestAccounts"});
      if (racuni != null) {
        return racuni[0];
      } else return ""
    } else return "";
  }

  namestiPametnoPogodbo() {
    this.branjeJsonService.preberiJsonDatoteko().subscribe((pogodbaABI) => {
      web3namestiPogodbo(pogodbaABI);
    });
  }

  ngOnInit(): void {
    this.loadScript("../../../assets/javascripts/new_recipe.js");
    this.vrniUporabnika().then(res => {
      this.ethNaslov = res;
    });

    this.namestiPametnoPogodbo();
  }
}
