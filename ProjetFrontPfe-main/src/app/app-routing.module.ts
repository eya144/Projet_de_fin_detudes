import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyAuthGuard } from './services/my-auth-guard.guard';
import { ServiceslistComponent } from './serviceslist/serviceslist.component';
import { AgencesComponent } from './agences/agences.component';
import { UpdateaccountComponent } from './updateaccount/updateaccount.component';
import { EyaagendaComponent } from './eyaagenda/eyaagenda.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DetailsagenceComponent } from './detailsagence/detailsagence.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
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

const routes: Routes = [
    { path: '', component: HomeComponent},

    { path: 'home', component: LoaderComponent},
    //, canActivate: [MyAuthGuard]
    {path:'avis/:key/:val/:vala',component:ReviewComponent,canActivate: [MyAuthGuard]},
    {path:'register', component:RegisterComponent},
    {path:'agences/:val',component:AgencesComponent},
    {path:'login', component:LoginComponent},
    {path:'voirreclamation/:key', component:VoirreclamationComponent,canActivate: [MyAuthGuard]},
    {path:'agenda/:key/:val/:vala', component:EyaagendaComponent,canActivate:[MyAuthGuard]},
    {path:'serviceslist',component:ServiceslistComponent},
    {path:'updateAccount',component:UpdateaccountComponent,canActivate:[MyAuthGuard]},
    {path:'ModifierAccount',component:ModifierclientComponent,canActivate:[MyAuthGuard]},

    {path:'reclamation',component:ReclamationComponent,canActivate:[MyAuthGuard]},
    {path:'details/:key/:val',component:DetailsagenceComponent},
    {path:'forgetPassword',component:ForgetPasswordComponent},
    {path:'RecoverPassword',component:RecoverPasswordComponent},
    {path:'reponses',component:ListReponsesComponent,canActivate: [MyAuthGuard]},

    {path:'reponse/:key',component:ResponseComponent,canActivate: [MyAuthGuard]},
    {path:'listereclamations',component:ListereclamationComponent},
    {path:'allAvisByService/:key',component:AllavisComponent},
    {path:'AvisService/:key',component:AvisServiceComponent},
    {path:'agenda/:key/:val',component:AgendaComponent,canActivate:[MyAuthGuard]},
    { path: '404', component: ErrorPageComponent },
    { path: '**', redirectTo: '/404' } // Redirection vers la page 404 pour toutes les autres routes non trouvées


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
