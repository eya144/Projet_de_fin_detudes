import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allavis',
  templateUrl: './allavis.component.html',
  styleUrls: ['./allavis.component.css']
})
export class AllavisComponent implements OnInit {
keyParams: any;
avis:any;
stars = [1, 2, 3, 4, 5];
currentRate = 0;

data:any={textcolor:"",textbutton:""}


details:any
rate(star: number) {
  this.currentRate = star;
}
constructor( private parms : ActivatedRoute,private http: HttpClient)
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
    this.getDetailsService(this.keyParams)
    this.getAvis(this.keyParams) 


  }
getDetailsService(code:any)
{
  this.http.get(`https://codebackend-production.up.railway.app/serviceBycode/${code}`).subscribe(
  
  (result: any) => {
    console.log(result);

this.details=result[0]
  console.log("details",this.details)
  }

);
}
getAvis(codea:any)
{

 this.http.get(`https://codebackend-production.up.railway.app/services/avis/${codea}`).subscribe(
  
  (result: any) => {
    console.log(result);

    this.avis = result;
  console.log("avissss",this.avis)
  }

);

}
}
