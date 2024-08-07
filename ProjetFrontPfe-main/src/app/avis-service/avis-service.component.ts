import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-avis-service',
  templateUrl: './avis-service.component.html',
  styleUrls: ['./avis-service.component.css']
})
export class AvisServiceComponent implements OnInit {
  keyParams: any;
  avis:any;
  stars = [1, 2, 3, 4, 5];
  currentRate = 0;
  data:any={textcolor:"",textbutton:""}
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
  this.getAvis(this.keyParams)  }
  
  getAvis(codec:any)
  {
  
   this.http.get(`https://codebackend-production.up.railway.app/SearchByNomService/${codec}`).subscribe(
    
    (result: any) => {
      console.log(result);
      
  
      this.avis = result;
    console.log(this.avis)
    }
  
  );
  
  }
  }
  