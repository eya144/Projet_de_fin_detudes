import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import the FormsModule
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ServiceslistComponent } from './serviceslist/serviceslist.component';
import { AgencesComponent } from './agences/agences.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateaccountComponent } from './updateaccount/updateaccount.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { EyaagendaComponent } from './eyaagenda/eyaagenda.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DetailsagenceComponent } from './detailsagence/detailsagence.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { IonicModule } from '@ionic/angular';
import { ResponseComponent } from './response/response.component';
import { ListereclamationComponent } from './listereclamation/listereclamation.component';
import { AllavisComponent } from './allavis/allavis.component';
import { VoirreclamationComponent } from './voirreclamation/voirreclamation.component';
import { ListReponsesComponent } from './list-reponses/list-reponses.component';
import { AvisServiceComponent } from './avis-service/avis-service.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ModifierclientComponent } from './modifierclient/modifierclient.component';
import { ReviewComponent } from './review/review.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FooterComponmentComponent } from './footer-componment/footer-componment.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    ReviewComponent,
    RegisterComponent,
    LoginComponent,
    ServiceslistComponent,
    AgencesComponent,
    NavbarComponent,
    UpdateaccountComponent,
    EyaagendaComponent,
    ReclamationComponent,
    DetailsagenceComponent,
    ForgetPasswordComponent,
    ResponseComponent,
    ListereclamationComponent,
    AllavisComponent,
    VoirreclamationComponent,
    ListReponsesComponent,
    AvisServiceComponent,
    AgendaComponent,
    ModifierclientComponent,
    ErrorPageComponent,
    RecoverPasswordComponent,
    FooterComponmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
    IonicModule.forRoot() ,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
