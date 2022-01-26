import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from 'src/app/skupno/komponente/index/index.component';
import { LoginComponent } from "src/app/skupno/komponente/login/login.component";
import { CalculatorComponent } from "src/app/skupno/komponente/calculator/calculator.component";
import { MyprofileComponent } from 'src/app/skupno/komponente/myprofile/myprofile.component';
import { AboutusComponent } from 'src/app/skupno/komponente/aboutus/aboutus.component';
import { EditProfileComponent } from 'src/app/skupno/komponente/edit-profile/edit-profile.component';
import { NewRecipeComponent } from 'src/app/skupno/komponente/new-recipe/new-recipe.component';
import { DbComponent } from "../../skupno/komponente/db/db.component";
import { AdministratorComponent } from "../../skupno/komponente/administrator/administrator.component";
import { AuthGuardService as AuthGuard } from '../../skupno/storitve/auth-guard.service';

const poti: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'iskanje/:iskalniNiz/:broj', component: IndexComponent },
  { path: 'myprofile', component: MyprofileComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'new_recipe', component: NewRecipeComponent },
  { path: 'db', component: DbComponent },
  { path: 'administrator', component: AdministratorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule],
})
export class AppUsmerjanjeModule { }

