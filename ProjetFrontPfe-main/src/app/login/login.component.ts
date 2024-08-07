import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any;
  inputFields: any;
  steps: any;
  currentTab: number = 0;
  token: any
  successMessage: any;
  errorMessage: any;



data:any
  password: string = '';
  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
  console.log( this.showPassword)
}

  constructor(private authservice: AuthService, private router: Router,private http:HttpClient,private translate :TranslateService) { }

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
    this.showTab(this.currentTab);







  }

  showTab(n: number) {
    const tabs = this.form.querySelectorAll(".tab");
    tabs.forEach((tab: any) => {
      tab.style.display = "none";
    });
    tabs[n].style.display = "block";

    this.steps.forEach((step: any, i: number) => {
      if (i <= n) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

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


  login(f: any) {
    if (this.validateForm()) {
      let data = f.value;
      console.log(data);
      let result;
      console.log(data);
      // Call the login() function and set the value of `test`
      this.authservice.login(data.telephone, data.password).subscribe(
        (response: any) => {
          console.log(response);
          //this.successMessage = "Successfully logged ";
        
            if (this.translate.currentLang ==="En") {

              Swal.fire(
                {
                  icon: 'success',
                  title: 'Success!',
                  text: 'Logged In Successfully !',
                })}else{
                  Swal.fire(
                    {
                      icon: 'success',
                      title: 'Succès!',
                      text: 'Connecté avec succès !',
                    })
              }
          
          localStorage.setItem('token', response.token)
         this.addSession(data.telephone)
          setTimeout(() => {
            this.router.navigateByUrl('/serviceslist');
          }, 2000);

          this.errorMessage = null;

        },
        (error: any) => {

          console.log(error.error);
          //this.errorMessage = error.error.err;
          this.successMessage = null;
          console.log(this.errorMessage);
          if (this.translate.currentLang ==="En") {

            Swal.fire(
              {
                icon: 'error',
                title: 'Error!',
                text: 'Please check your data.',
              })}else{
                Swal.fire(
                  {
                    icon: 'error',
                    title: 'Erreur !',
                    text: "Veuillez vérifier vos données, s'il vous plaît.!",
                  })
            }
        
        }
      );
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
addSession(tel:any)
{
  this.authservice.addSession(tel).subscribe(
    (response: any) => {
      console.log(response);
},
    (error: any) => {

      console.log(error.error);

    }
  );
}


}
