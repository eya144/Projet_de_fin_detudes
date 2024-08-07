import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() place = 1;
  isLoggedIn: any
  tel:any
  nb_reponses:any
  currentUser: any={photo:""};
  data:any ={image:""}
  constructor(private authService: AuthService,private router : Router,private http:HttpClient) {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      //console.log(result);
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    //console.log(this.data)
    }
   
   
    );}

  ngOnInit() {
    
    
  
    //console.log(this.authService.getClientDataFromToken())
    this.getClientdata(this.authService.getClientDataFromToken().telephone)
      this.isLoggedIn =this.authService.isLoggedIn()
//console.log(this.authService.getClientDataFromToken().telephone)
 this.tel=this.authService.getClientDataFromToken()?.telephone
 //console.log(this.tel)
 this.getnbReponsesNonLu(this.tel)
    //console.log("this.place");
    //console.log(this.place);
    
  }
  getClientdata(id:any){
    this.authService.getClient(id).subscribe(
        (response) => {
          this.currentUser = response;
          //console.log(this.currentUser)
          this.currentUser.dateNaissance=this.formatDate(this.currentUser.dateNaissance)
          this.currentUser.photo=`https://codebackend-production.up.railway.app/getImges/${this.currentUser.photo}`;
  
        },
       
      );  
    }
    formatDate(date: string) {
      return new Date(date).toISOString().substring(0, 10);
    }
  ngAfterViewInit() {
    this.activateMenu(this.place)
  }
  activateMenu(place:number){
    if (place === 1) {
      let x =document.getElementById("first")?.classList.add("active");
    } else if (place === 2) {
      let x =document.getElementById("second")?.classList.add("active");
    } else if (place === 3) {
      let x = document.getElementById("Réclamation")?.classList.add("active");
      console.log(x)
    } else if (place === 4) {
      let x =document.getElementById("register")?.classList.add("active");
      console.log(x)
    }
     else if (place === 5) {
      let x =document.getElementById("login")?.classList.add("active");
      console.log(x)
    }else {
      let x =document.getElementById("first")?.classList.add("active");
      console.log(x)
    }
  }
  getnbReponsesNonLu(tel:any)
  {
   this.http.get(`https://codebackend-production.up.railway.app/countunreadReponses/${tel}`).subscribe(
    
    (result: any) => {
      //console.log(result);
      
  
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

  mobileToggle() {
    var x = document.getElementById("menuu");
    if (x?.style.display === "block") {
      x.style.display = "none";
    } else {
      x!.style.display = "block";
    }
  }
  
  
}
