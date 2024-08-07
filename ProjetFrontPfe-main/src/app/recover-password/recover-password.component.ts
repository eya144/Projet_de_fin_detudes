import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  form: any;
  inputFields: any;
  steps: any;
  currentTab: number = 0;
  token: any
  successMessage: any;
  errorMessage: any;
  data: any
  phone: any
  html: any
  msgsuccess: any
  msgfail: any
  t: any
  b: any
  password: string = '';
  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
  console.log( this.showPassword)
}

  constructor(private authservice: AuthService, private router: Router, private http: HttpClient, private translate: TranslateService) {

  }
  ngOnInit() {
   this.http.get('https://codebackend-production.up.railway.app/formcontenu').subscribe(
    
    (result: any) => {
      console.log(result);
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    console.log(this.data)
    }
    
    );
  }
  forgetPassword(f: any) {
    if (this.phone) {
      let data = this.phone;
      console.log(data);
      // Call the login() function and set the value of `test`
      if (data) {
        this.authservice.RecoverPassword(data).subscribe(
          (response: any) => {
            console.log(response);

            /*setTimeout(() => {
              //this.router.navigateByUrl('/forgetPassword');//send email as parametre
              this.router.navigate(['forgetPassword'], { state: { phone: data } });
            }, 2000);*/
            if (this.translate.currentLang === "En") {
              this.html = '<div class="input-group" style="justify-content: center;">' +

                '<span class="input-group-text">' +
                '<i class="fa fa-phone"></i>' +
                '</span>' +
                '<input id="vphone" style="margin-top: 0px;margin-bottom: 0px;" class="swal2-input" placeholder="Phone number" value ="' + data + '" readonly> ' +

                '</div>' +

                '<div class="input-group" style="justify-content: center;    margin-top: 8%;">' +

                '<span class="input-group-text">' +
                '<i class="fa fa-lock"></i>' +
                '</span>' +
                '<input id="vcode" style="margin-top: 0px;margin-bottom: 0px;" class="swal2-input" placeholder="Recovery Code">' +

                '</div>';
              this.msgsuccess = "You can now cange your password!";
              this.msgfail = "Wrong informations";
              this.b = "Check";
              this.t = "We sent you a code via mail , please enter your code";
            } else {
              this.html = '<div class="input-group" style="justify-content: center;">' +

                '<span class="input-group-text">' +
                '<i class="fa fa-phone"></i>' +
                '</span>' +
                '<input id="vphone" style="margin-top: 0px;margin-bottom: 0px;" class="swal2-input" placeholder="Phone number" value ="' + data + '" readonly> ' +

                '</div>' +

                '<div class="input-group" style="justify-content: center;    margin-top: 8%;">' +

                '<span class="input-group-text">' +
                '<i class="fa fa-lock"></i>' +
                '</span>' +
                '<input id="vcode" style="margin-top: 0px;margin-bottom: 0px;" class="swal2-input" placeholder="Code de récupération">' +

                '</div>';
              this.msgsuccess = "Vous pouvez maintenant changer votre mot de passe!";
              this.msgfail = "Informations erronées";
              this.b = "Vérifier";
              this.t = "nous vous avons envoyé un code par mail, veuillez entrer votre code";
            }
            Swal.fire({
              title: this.t,
              html: this.html,
              showCancelButton: true,
              confirmButtonText: this.b,
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                let vphone = (document.getElementById('vphone') as HTMLInputElement).value;
                let vcode = (document.getElementById('vcode') as HTMLInputElement).value;
                let res = await this.authservice.VerifyRecoverCode(vphone, vcode).subscribe(
                  (response) => {                           //Next callback
                    console.log('response received')
                    if (this.translate.currentLang === "En") {

                      Swal.fire(

                        'Success',
                        this.msgsuccess,
                        'success',
                      )
                    } else {
                      Swal.fire(
                        'Succès',
                        this.msgsuccess,
                        'success',
                      )
                    }
                    setTimeout(() => {
                      //this.router.navigateByUrl('/forgetPassword');//send email as parametre
                      this.router.navigate(['forgetPassword'], { state: { phone: data } });
                    }, 1000);
                    return true;
                  },
                  (error) => {                              //Error callback
                    console.error('error caught in component')
                   
                    if (this.translate.currentLang ==="En") {

                      Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: this.msgfail,
                      })}else{
                        Swal.fire({
                          icon: 'error',
                          title: 'Erreur...',
                          text: this.msgfail,
                        })
                      }
                    return false;
                  }
                )
              }

              ,
              allowOutsideClick: () => !Swal.isLoading()
            })
          },
          (error: any) => {
            console.log(error.error);
            if (this.translate.currentLang ==="En") {

              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.error,
              })}else{
                Swal.fire({
                  icon: 'error',
                  title: 'Erreur...',
                  text: error.error,
                })
              }
          }
        );
      } else {
        console.log("please input telephone");
      }
    } else {
      if (this.translate.currentLang ==="En") {

        Swal.fire(
          {
            icon: 'error',
            title: 'Error!',
            text: 'Please fill out the entire form!',
          })}else{
            Swal.fire(
              {
                icon: 'error',
                title: 'Erreur !',
                text: "Veuillez remplir tout le formulaire, s'il vous plaît !",
              })
        }
    }
  }

}
