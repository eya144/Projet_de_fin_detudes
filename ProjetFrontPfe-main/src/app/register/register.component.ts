import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any;
  inputFields: any;
  steps: any;
  currentTab: number = 0;
  sendcode: any;
  showvalid=true;
  successMessage: any;
  errorMessage: any;
 

  latitude:any;
  longitude:any;
  image:any;
  data:any
select(e:any)
{this.image=e.target.files[0]}
message=""
password: string = '';
showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
  console.log( this.showPassword)
}

  constructor(private router : Router,private authservice:AuthService,private translate:TranslateService,private http:HttpClient) {

    
    if (navigator.geolocation) {
    
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log("donnes", this.latitude, this.longitude);
        },
        (error) => {
          console.log(`Error occurred: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
   } else {
    this.latitude = 36.437286;
    this.longitude = 10.676413;
   }
  
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
    this.form = document.getElementById("regForm")!;
    this.inputFields = this.form.querySelectorAll("input");
    this.steps = this.form.querySelectorAll(".step");
    this.showTab(this.currentTab);



    document.getElementById("nextBtn")!.addEventListener("click", () => {
      this.nextPrev(1);
    });

    this.inputFields.forEach((field: any) => {
      field.addEventListener("input", () => {
        field.classList.remove("invalid");
      });
    });




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


    if (n === this.steps.length - 1) {
      if(this.showvalid==true)
      {
        console.log("show",this.showvalid);
         document.getElementById("nextBtn")!.innerHTML = "Submit";}
         
      else{
        document.getElementById("nextBtn")!.innerHTML = "Reset";
        this.nextPrev(-1);
      }
     
    } else {
      document.getElementById("nextBtn")!.innerHTML = "Next";
    }
  }

  nextPrev(n: number) {
    if (n === 1 && !this.validateForm()) {
      return false;
    }

    this.currentTab += n;
   
    if(this.currentTab==6)
        {
        if(this.showvalid===true)
        {
          this.router.navigate(['/login'])
        }
        else
        {
          location.reload();

        }
      }
      this.showTab(this.currentTab);

    return true; // add this line
  }


  validateForm() {
    const currentTabFields = this.form.querySelectorAll(".tab")[this.currentTab].querySelectorAll("input");
    let valid = true;
    currentTabFields.forEach((field: any) => {
      if (field.value === "") {
        field.classList.add("invalid");
        valid = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "please fill out the form",
        })
      }
    });

    if (valid) {
      currentTabFields.forEach((field: any) => {
        field.classList.remove("invalid");
      });
    }

    return valid;
  }

  async createUser(f: any) {
    console.log(f.value)
      let data = f.value;
      if (this.currentTab == 1) {
       this.authservice.sendVerificationCode(data.email,data.telephone)  .subscribe(
        (response: any) => {
          this.successMessage = response;
        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
  
      }
      else if (this.currentTab==3)
      {
        if(data.password!=data.confirmpassword)
        {
          //this.errorMessage="Password and confirm Password are not matched "
          setTimeout(() => {
            this.errorMessage=""}, 2000);
        }
      }

      else if(this.currentTab == 5){
      
          // Ask the user to resend the code
          const formData = new FormData();
  if ( this.latitude === undefined  || this.longitude === undefined ) {
    this.latitude = 36.437286;
    this.longitude = 10.676413;
  }
  // append the other fields to the form data object
  formData.append('email', data.email);
  formData.append('code', data.code);
  formData.append('telephone', data.telephone);
  formData.append('nom', data.nom);
  formData.append('prenom', data.prenom);
  formData.append('dateNaissance', data.dateNaissance);
  formData.append('password', data.password);
  formData.append('latitude', this.latitude.toString());
  formData.append('longtitude', this.longitude.toString());
  formData.append('ville', data.ville);
  formData.append('image',this.image);
         
          this.authservice.register(formData) .subscribe(
            (response: any) => {
              console.log(response);
              this.errorMessage=null

              //this.successMessage = response;
             
              if (this.translate.currentLang ==="En") {

                Swal.fire(
                  'success!',
                  'Account created Successfully!',
                  'success'
                )}else{
                  Swal.fire(
                    'Succès!',
                    'Compte créé avec succès!',
                    'success'
                  )
                }
              setTimeout(() => {
                this.router.navigateByUrl('/login');}, 1000);
            },
            (error: any) => {
              this.showvalid=false;
              this.successMessage=null
              console.log(error.error);
              //this.errorMessage = error.error;
              if (this.translate.currentLang ==="En") {

                Swal.fire(
                  {
                    icon: 'error',
                    title: 'Error!',
                    text: error.error,
                  })}else{
                    Swal.fire(
                      {
                        icon: 'error',
                        title: 'Erreur !',
                        text: error.error,
                      })
                }
            }
          );
          
         
        
      }
      else{
        this.successMessage=null;
        this.errorMessage=null
      }
     
    }

 
}
