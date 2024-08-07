import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AvisService } from '../services/avis.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import Swiper from 'swiper';
import { TranslateService } from '@ngx-translate/core';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  
  //for rating starts
  stars = [1, 2, 3, 4, 5];
  currentRate = 0;

  details: any;
  rate(star: number) {
    this.currentRate = star;
  }

  keyParams: any;
  successMessage: any;
  errorMessage: any;
  valParams: any;
  avis: any;
  data: any={textcolor:""};
  telephone;
  valaParams: any;
  swiper!: Swiper;

  constructor(
    private avisservice: AvisService,
    private route: Router,
    private parms: ActivatedRoute,
    private authservice: AuthService,
    private http: HttpClient,
    private translate:TranslateService
  ) {
    this.telephone = this.authservice.getClientDataFromToken().telephone;
    this.parms.params.subscribe((query) => {
      return (this.keyParams = query['key']);
    });

    this.parms.params.subscribe((query) => {
      return (this.valParams = query['val']);
    });
    this.parms.params.subscribe((query) => {
      return (this.valaParams = query['vala']);
    });
    console.log('key', this.keyParams);
    console.log('val', this.valParams);
  }  
  
  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 5
        }
      }
    });
  }
  ngOnInit() {
   
    this.getDetailsService(this.keyParams);
    this.getAvis(this.keyParams);
    this.http
      .get(`https://codebackend-production.up.railway.app/formcontenu`)
      .subscribe((result: any) => {
        console.log(result);

        this.data = result;
        this.data.image = `https://codebackend-production.up.railway.app/getLogo/${this.data.image}`;
        console.log(this.data);
      });
  }

  addavis(f: any) {
    let data = f.value;
    
    
      let rating =
        (
          document.querySelector(
            'input[name="rating"]:checked'
          ) as HTMLInputElement
        )?.value || null;
      console.log('rating', rating);
      let etoile = 0;
      if (rating != null) {
        etoile = parseInt(rating);
      }
      console.log('etoile', etoile);
      this.avisservice
        .addavis(
          this.authservice.getClientDataFromToken().telephone,
          this.keyParams,
          data.commentaire,
          etoile
        )
        .subscribe(
          (response: any) => {
            this.errorMessage = null;
            this.successMessage = 'Added it successfully';
            if (this.translate.currentLang ==="En") {

              Swal.fire('Success!', 'Feedback added it successfully!', 'success');}else{
                Swal.fire(
                  'Succès!',
                  'Avis à été enregistré avec succès!',
                  'success'
                )
              }
              this.ngOnInit()
          },
          (error: any) => {
            this.successMessage = null;
            this.errorMessage = error.error;
           
            if (this.translate.currentLang ==="En") {

              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.error,
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Erreur...',
                text: error.error,
              });
              }
          },
          
        );
    
    
    console.log(data);
  }

  gotoallAvis(key: any) {
    this.route.navigate(['allAvisByService/' + key]);
  }
  getDetailsService(code: any) {
    this.http
      .get(`https://codebackend-production.up.railway.app/serviceBycode/${code}`)
      .subscribe((result: any) => {
        console.log(result + 'this is  getDetailsService');

        this.details = result[0];
        console.log('details', this.details);
      });
  }
  getAvis(codea: any) {
    this.http
      .get(`https://codebackend-production.up.railway.app/services/avis/${codea}`)
      .subscribe((result: any) => {
        console.log(result);

        this.avis = result;
        console.log('avissss', this.avis);
      });
  }
}
