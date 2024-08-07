import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RepondService } from '../services/repond.service';

@Component({
  selector: 'app-list-reponses',
  templateUrl: './list-reponses.component.html',
  styleUrls: ['./list-reponses.component.css']
})
export class ListReponsesComponent {
  reponses: any
  tel: any
  data: any
  constructor(private http: HttpClient, private authservice: AuthService, private route: Router, private reponseapi: RepondService) {

    this.tel = this.authservice.getClientDataFromToken().telephone

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
    this.getDonneesReponse(this.tel)
  }
  FilterParDate(codec: any) {
    this.http.get(`https://codebackend-production.up.railway.app/ReponsesDay/${codec}`).subscribe(

      (result: any) => {
        console.log(result);


        this.reponses = result;
        this.reponses.forEach((reponse: any) => {

        });
      }

    );

  }
  getDonneesReponse(codec: any) {
    console.log(codec)
    this.http.get(`https://codebackend-production.up.railway.app/ReponsesDESC/${codec}`).subscribe(

      (result: any) => {
        console.log(result);

        result.forEach((code: any) => {
          this.updateView(code.code_Reponse)
        });

        this.reponses = result;
        console.log("reponses", this.reponses)

        console.log(this.reponses)
        this.reponses.forEach((reponse: any) => {

        });
      }

    );

  }
  updateView(code: any) {
    this.reponseapi.updateView(code).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  viewReclamation(key: any) {
    this.route.navigate(['voirreclamation/' + key])
  }
}


