import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listereclamation',
  templateUrl: './listereclamation.component.html',
  styleUrls: ['./listereclamation.component.css']
})
export class ListereclamationComponent implements OnInit {
  reclamations:any
  tel:any
 data:any={textcolor:""}
  constructor(private http: HttpClient,private router:Router,private authservice:AuthService,private route:Router){
    this.tel= this.authservice.getClientDataFromToken().telephone

  }
  ngOnInit(): void {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
      (result: any) => {
        console.log(result);
        
      
        this.data = result;
        this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
      console.log(this.data)
      }
      
      );
this.getAllReclamtions(this.tel)  }
FilterParDate(telephone:any)
{
 this.http.get(`https://codebackend-production.up.railway.app/ReclamationsDay/${telephone}`).subscribe(
  
  (result: any) => {
    console.log(result);
    

    this.reclamations = result;
  console.log(this.reclamations)
  this.reclamations.forEach((reclamation: any) => {
  
    if (reclamation.repond == true) {
      reclamation.repond = "Repond";
      
    }
    else{
      reclamation.repond = "Non Repond";

    }
  });
  }

);

}
  getAllReclamtions(telephone:any)
  {
   this.http.get(`https://codebackend-production.up.railway.app/ReclamationsByClient/${telephone}`).subscribe(
    
    (result: any) => {
      console.log(result);
      

      this.reclamations = result;
      
      this.reclamations.forEach((reclamation: any) => {
       
        if (reclamation.repond == true) {
          reclamation.repond = "Repond";
          
        }
        else{
          reclamation.repond = "Non Repond";
  
        }
      });
      
      console.log(this.reclamations);
    
    })
  }
  viewReponse(key:any)
  {
    this.route.navigate(['reponse/'+key])
  }
}
