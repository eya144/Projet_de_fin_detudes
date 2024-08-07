import { Component ,OnInit , ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent  implements OnInit {

 
isLoggedIn = this.authService.isLoggedIn();
data:any={textcolor:"",textbutton:""}

nb_reponses:any
  tel: any;

constructor(private authService: AuthService,private router : Router,private http:HttpClient) { }


  

  ngOnInit(): void {


    
      this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
      
      (result: any) => {

        
      
        this.data = result;
        this.data.image=`http://127.0.0.1:3000/getLogo/${this.data.image}`

      }
      
      );
        this.isLoggedIn =this.authService.isLoggedIn()

   this.tel=this.authService.getClientDataFromToken().telephone

   this.getnbReponsesNonLu(this.tel)
  
    
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      //console.log(result);
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`

    }
    
    );

  }
  getnbReponsesNonLu(tel:any)
  {
   this.http.get(`https://codebackend-production.up.railway.app/countunreadReponses/${tel}`).subscribe(
    
    (result: any) => {

      
  
      this.nb_reponses = result.count;
      
      
    
    })
  }
  onLogout() {
    this.updateSession(this.authService.getClientDataFromToken().telephone)
    this.authService.logout();
 
    this.isLoggedIn=false
    this.router.navigateByUrl('');
 

  }

  updateSession(tel:any)
  {
    this.authService.updateSession(tel).subscribe(
      (response: any) => {
        console.log(response);
  },
      (error: any) => {
  
        console.log(error.error);
  
      }
    );
  }



}