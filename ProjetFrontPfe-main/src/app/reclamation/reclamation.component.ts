import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';
import { AgencesService } from '../services/agences.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {

  keyParams: any
  successMessage: any;
  errorMessage: any;
  valParams: any;
  agences: any;
  telephone: any;
  file: any;
  select(e: any) { this.file = e.target.files[0] }

  data: any = { textcolor: "", textbutton: "" }

  constructor(private http: HttpClient, private reclamtionservice: ReclamationService, private agenceservice: AgencesService, private authservice: AuthService, private translate : TranslateService) {

    this.agenceservice.getAllagence().subscribe(
      (response: any) => {
        console.log(response)
        this.agences = response;
        console.log(this.agences)
      },
      (error: any) => {
        this.agences = null;
      }
    );

    this.telephone = this.authservice.getClientDataFromToken().telephone;

  }
  ngOnInit() {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(

      (result: any) => {
        console.log(result);


        this.data = result;
        this.data.image = `https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
        console.log(this.data)
      }

    );
  }


  addreclamation(f: any) {
    let data = f.value;
    if (data.contenu_Reclamation === "" && data.id_agence === "" && data.objectif_Reclamation === "") {
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: "S'il vous plait remplissez le formulaire",
      })
      if (this.translate.currentLang ==="En") {

        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: "Please fill all the form fields",
        })}else{
            Swal.fire({
              icon: 'error',
              title: 'Erreur...',
              text: "S'il vous plait remplissez le formulaire",
            })
        }
      return;
    }
    const formData = new FormData();
    // append the other fields to the form data object
    formData.append('objectif_Reclamation', data.objectif_Reclamation);
    formData.append('contenu_Reclamation', data.contenu_Reclamation);
    formData.append('document', this.file);
    this.reclamtionservice.addreclamtion(this.authservice.getClientDataFromToken().telephone, data.id_agence, formData).subscribe(
      (response: any) => {
        this.errorMessage = null
        this.successMessage = "added it successfully"
       
        if (this.translate.currentLang ==="En") {

          Swal.fire(
            'success',
            "Complaint Add with success",
            'success'
          )}else{
              Swal.fire(
                'success',
                "Réclamation Ajouter avec success",
                'success'
              )
          }
      },
      (error: any) => {
        this.successMessage = null
      
           
    if (this.translate.currentLang ==="En") {

      Swal.fire(
        
          'Error...',
          error.error,
          'error'
        )}else{
          Swal.fire(
            'Erreur...',
            error.error,
            'error'
          )
      }
        this.errorMessage = error.error;
      }
    );
    console.log(data)
  }
}

