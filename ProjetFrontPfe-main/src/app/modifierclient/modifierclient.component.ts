import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modifierclient',
  templateUrl: './modifierclient.component.html',
  styleUrls: ['./modifierclient.component.css']
})
export class ModifierclientComponent {
  successMessage: any;
  errorMessage: any;
  currentUser: any = {photo:"",telephone:""}
  data:any={textcolor:"",textbutton:""}
 
  error: any;
latitude:any
longitude:any
  constructor(private http:HttpClient,private authservice:AuthService,private router:Router,private translate:TranslateService){
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
   }}
  
  
  ngOnInit() {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      console.log(result);
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    console.log(this.data)
    }
    
    );
    console.log(this.authservice.getClientDataFromToken())
    this.getClientdata(this.authservice.getClientDataFromToken().telephone)
  }
  getClientdata(id:any){
  this.authservice.getClient(id).subscribe(
      (response) => {
        this.currentUser = response;
        console.log(this.currentUser)
        this.currentUser.dateNaissance=this.formatDate(this.currentUser.dateNaissance)
        this.currentUser.photo=`https://codebackend-production.up.railway.app/getImges/${this.currentUser.photo}`;

      },
      (error) => {
        this.error = error.message;
      }
    );  
  }
  formatDate(date: string) {
    return new Date(date).toISOString().substring(0, 10);
  }
   
image:any;
select(e:any)
{this.image=e.target.files[0]}

Update(f:any)
{
let data = f.value;
console.log(data)
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
        
this.authservice.updateClient(formData) .subscribe(
  (response: any) => {
    console.log(response);
    this.successMessage = "Votre compte a été mis à jour avec success"
    
    this.errorMessage = ""
    if (this.translate.currentLang ==="En") {

      Swal.fire(
        
          'Account update',
            'Your account has been successfully updated',
            'success',
        )}else{
          Swal.fire(
            'Mise à jour du compte',
            'Votre compte a été mis à jour avec success',
            'success'
          )
      }
  
   
setTimeout(() => {
  this.router.navigateByUrl('/updateAccount');

 
}, 1000);

  },
  (error: any) => {
console.log(error.error);
    this.errorMessage = error.error;
    this.successMessage =""
  
    
    if (this.translate.currentLang ==="En") {

      Swal.fire(
        
          'Account update',
          error.error,
          'error'
        )}else{
          Swal.fire(
            'Echec de mise à jour votre compte',
            error.error,
            'error'
          )
      }
  }
);
}

}
