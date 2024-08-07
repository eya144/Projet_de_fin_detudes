import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  form: any;
  inputFields: any;
  steps: any;
  currentTab: number = 0;
  token:any
  successMessage:any;
  errorMessage:any;
  data:any
  phone:any;
  password: string = '';
  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
  console.log( this.showPassword)
}

  constructor(private authservice: AuthService,private translate:TranslateService,private router : Router,private http:HttpClient) { 
    try {console.log(" "+this.router?.getCurrentNavigation()?.extras?.state?.['phone']);
    this.phone = this.router?.getCurrentNavigation()?.extras?.state?.['phone'];
    if (this.phone == null) {
      this.router.navigateByUrl('/RecoverPassword');
    }
    } catch(e) {
      console.log(e)
    }
    
  }

  ngOnInit() {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      console.log(result);
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
      console.log(this.data)
    }
    );
    this.form = document.getElementById("regForm")!;
    this.inputFields = this.form.querySelectorAll("input");
    this.steps = this.form.querySelectorAll(".step");
  }
  validateForm() {
    const currentTabFields = this.form.querySelectorAll(".tab")[this.currentTab].querySelectorAll("input");
    let valid = true;
    currentTabFields.forEach((field: any) => {
      if (field.value === "") {
        field.classList.add("invalid");
        valid = false;
      }
    });

    if (valid) {
      currentTabFields.forEach((field: any) => {
        field.classList.remove("invalid");
      });
    }

    return valid;
  }


forgetPassword(f:any)
{
  if(this.validateForm())
  {
    let data = f.value;
    
    data.telephone=this.phone;
    console.log(data);
    // Call the login() function and set the value of `test`
    if(data.password == data.confirmpassword) {
      this.authservice.forgetPassword(data.telephone, data.password).subscribe(
        (response: any) => {
          console.log(response);
          if (this.translate.currentLang ==="En") {

            Swal.fire(
              'Success',
              'Successfully updated ',
              'success'
            )}else{
              Swal.fire(
                'Succès',
                'Mise à jour de mot passe réussie ! ',
                'success'
              )
            }
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        (error: any) => {
          console.log(error.error);
          this.errorMessage = error.error;
          if (this.translate.currentLang ==="En") {

            Swal.fire(
              'Error',
              error.error,
              'error'
            )}else{
              Swal.fire(
                'Erreur',
                error.error,
                'error'
              )
            }        }
      );
    } else {
      this.successMessage = null;
      if (this.translate.currentLang ==="En") {

        Swal.fire(
          'Error',
          'Password and Confirm Password do not match',
          'error'
        )}else{
          Swal.fire(
            'Erreur',
            'Le mot de passe et la confirmation du mot de passe ne correspondent pas',
            'error'
          )
        }
      this.errorMessage = "Password and Confirm Password do not match";
      console.log(this.errorMessage);
    }
  }
}
}
