import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateaccount',
  templateUrl: './updateaccount.component.html',
  styleUrls: ['./updateaccount.component.css']
})
export class UpdateaccountComponent {
  successMessage: any;
  errorMessage: any;
  
  error: any;
  currentUser: any = {photo:""}
  data:any={textcolor:"",textbutton:""}
  latitude: any;
  longitude: any;
  constructor(private http:HttpClient,private authservice:AuthService,private router : Router){
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
    console.log(this.authservice.getClientDataFromToken())
    this.getClientdata(this.authservice.getClientDataFromToken().telephone)
  }
  getClientdata(id:any){
  this.authservice.getClient(id).subscribe(
      (response) => {
        this.currentUser = response;
        console.log(this.currentUser);
        this.currentUser.dateNaissance = this.formatDate(this.currentUser.dateNaissance);
        this.currentUser.photo = `https://codebackend-production.up.railway.app/getImges/${this.currentUser.photo}`;

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



delete(id:any)
{
 
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer ce compte ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {

      this.authservice.deleteCompte(id).subscribe(

    (result: any) => {
    console.log('deleted successfely')
          
      
        this.router.navigateByUrl('/login');


      this.authservice.logout();

    },
    (error: any) => {

      console.log(error.error);
      this.errorMessage = error.error;
      console.log(this.errorMessage);

    })
    Swal.fire(
      'Supprimé !',
      'compte a été supprimé.',
      'success'
    );
  }
});
}
}
