import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReclamationService } from '../services/reclamation.service';
import { RepondService } from '../services/repond.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {
  reponses:any
  keyParams:any
  data:any
  constructor( private parms : ActivatedRoute,private http: HttpClient,private reponseapi:RepondService)
  {
    this.parms.params.subscribe(query=>{
      return this.keyParams=query['key']
    })
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
  this.getDonneesReponse(this.keyParams)
}
getDonneesReponse(codec:any)
{
  console.log(codec)
  
 this.http.get(`https://codebackend-production.up.railway.app/Reponses/byrecl/${codec}`).subscribe(
  
  (result: any) => {
    console.log(result);
    
    result.forEach((code:any) => {
      this.updateView(code.code_Reponse)
    });

    this.reponses = result;
    this.reponses.forEach((reponse: any) => {
      
    });
  console.log(this.reponses)
  }

);


}
updateView(code:any)
{
  this.reponseapi.updateView(code).subscribe(
    (response: any) => {
      console.log(response)
    },
    (error: any) => {
      console.log(error);
    }
  );
}

}

