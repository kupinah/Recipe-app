import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';
import { LayoutComponent } from './skupno/komponente/layout/layout.component';
import { LoginComponent } from './skupno/komponente/login/login.component';
import { CalculatorComponent } from './skupno/komponente/calculator/calculator.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './skupno/komponente/index/index.component';
import { SlikePipe } from './skupno/cevi/slike.pipe';
import { MyprofileComponent } from './skupno/komponente/myprofile/myprofile.component';
import { AboutusComponent } from './skupno/komponente/aboutus/aboutus.component';
import { EditProfileComponent } from './skupno/komponente/edit-profile/edit-profile.component';
import { NewRecipeComponent } from './skupno/komponente/new-recipe/new-recipe.component';
import { DbComponent } from './skupno/komponente/db/db.component';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';
import { NewlinePipe } from './skupno/cevi/newline.pipe';
import { AdministratorComponent } from './skupno/komponente/administrator/administrator.component';
import { JeZunajniPipe } from './skupno/cevi/je-zunajni.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { OnlineStatusModule } from 'ngx-online-status';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthGuardService as AuthGuard } from '../app/skupno/storitve/auth-guard.service';
import { UnderlinePipe } from './skupno/cevi/underline.pipe';
import { ItalicPipe } from './skupno/cevi/italic.pipe';
import { UppercasePipe } from './skupno/cevi/uppercase.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    CalculatorComponent,
    LayoutComponent,
    IndexComponent,
    SlikePipe,
    MyprofileComponent,
    AboutusComponent,
    EditProfileComponent,
    NewRecipeComponent,
    DbComponent,
    NewlinePipe,
    AdministratorComponent,
    JeZunajniPipe,
    UnderlinePipe,
    ItalicPipe,
    UppercasePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppUsmerjanjeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgxPaginationModule,
    OnlineStatusModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthGuard],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
