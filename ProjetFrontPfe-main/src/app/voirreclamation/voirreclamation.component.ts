import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepondService } from '../services/repond.service';

@Component({
  selector: 'app-voirreclamation',
  templateUrl: './voirreclamation.component.html',
  styleUrls: ['./voirreclamation.component.css']
})
export class VoirreclamationComponent {
  reclamations: any
  keyParams: any
  data: any
  constructor(private parms: ActivatedRoute, private http: HttpClient, private reponseapi: RepondService) {
    this.parms.params.subscribe(query => {
      return this.keyParams = query['key']
    })
  }
  ngOnInit(): void {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(

      (result: any) => {
        console.log(result);


        this.data = result;
        this.data.image = `https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
        console.log(this.data)
      }

    );
    this.getDonneesReclamation(this.keyParams)
  }
  getDonneesReclamation(codec: any) {
    console.log(codec)

    this.http.get(`https://codebackend-production.up.railway.app/GetReclamation/${codec}`).subscribe(

      (result: any) => {
        console.log(result);


        this.reclamations = result;
        this.reclamations.forEach((reclamation: any) => {


        });
        console.log(this.reclamations)
      }

    );


  }


}

