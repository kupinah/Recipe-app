import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { calories, Recept, ingredients } from '../razredi/recept';
import { catchError, merge, Observable, retry, throwError } from 'rxjs';
import { RezultatAvtentikacije } from "../razredi/rezultat-avtentikacije";
import { details, Users } from '../razredi/users';
import { of } from 'rxjs';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  constructor() { }
  private sledeciCall: string[] = [];
  
  public async recipe_call1(query: string) {
    var luka1 = "46253edf"
    var luka2 = "83a7a322e63288b2779b8d96d0c3efc4"
    const result = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${luka1}&app_key=${luka2}`);
    return await result.json();
  };

  public async recipe_call2(sledeciCall: string) {
    const result = await fetch(sledeciCall);
    return await result.json();
  };
  public pridobiZunajneRecepte(query: string, broj: string): Observable<Recept[]> {
    var receptiZunajni: Recept[] = [];

    if (broj == "1") {
      this.recipe_call1(query).then(res => {
        this.sledeciCall.push(res._links.next.href)
        res = res.hits
        //@ts-ignore
        for (let index = 0; index < res.length; index++) {
          var element = res[index];
          // console.log(element)
          var ingr: string = ""

          element = element.recipe
          //@ts-ignore
          element.ingredientLines.forEach(objstring => {
            ingr += objstring
            ingr += ", "
          });
          var novRecept: Recept = new Recept;
          novRecept.calories = new calories;
          novRecept.avg = 0;
          novRecept.stars = [0];
          novRecept.description = "zunajni";
          novRecept.ingredients = new ingredients;
          novRecept.userID = "zunajni"
          novRecept.preparation = 0
          novRecept.cooking = 0
          novRecept.instructions = "zunajni"
          novRecept.name = element.label
          novRecept.img = element.image
          novRecept.calories.calories = element.calories
          novRecept.ingredients.ingredientsList = ingr
          novRecept.calories.servings = element.yield
          receptiZunajni.push(novRecept)
        };
      }
      );
    } else {
      //@ts-ignore
      this.recipe_call2(this.sledeciCall[broj - 2]).then(res => {
        this.sledeciCall.push(res._links.next.href)
        res = res.hits
        //@ts-ignore
        for (let index = 0; index < res.length; index++) {
          var element = res[index];
          // console.log(element)
          var ingr: string = ""

          element = element.recipe
          //@ts-ignore
          element.ingredientLines.forEach(objstring => {
            ingr += objstring
            ingr += ", "
          });
          var novRecept: Recept = new Recept;
          novRecept.calories = new calories;
          novRecept.avg = 0;
          novRecept.stars = [0];
          novRecept.description = "zunajni";
          novRecept.ingredients = new ingredients;
          novRecept.userID = "zunajni"
          novRecept.preparation = 0
          novRecept.cooking = 0
          novRecept.instructions = "zunajni"
          novRecept.name = element.label
          novRecept.img = element.image
          novRecept.calories.calories = element.calories
          novRecept.ingredients.ingredientsList = ingr
          novRecept.calories.servings = element.yield
          receptiZunajni.push(novRecept)
        };
      }
      );
    }
    return of(receptiZunajni)
  }
}
