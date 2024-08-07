import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencesService } from '../services/agences.service';
import { ServicesService } from '../services/services.service';
import { HttpClient } from '@angular/common/http';
declare const L:any;

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.css']
})
export class AgencesComponent implements OnInit {

 
    title = 'locationApp';
 
    selectedgouvernorat: string = ''; 
    latitude:any
    longitude:any
  keyParams: any;
  details: any;
  agences: any[] = [];
  detailsofagence: any;
  searchTerm: string = '';
  selectedCity: string = ''; 
  villes: String[] | undefined;
  gouvernorats:String[] | undefined;
  message="";
  data:any={textcolor:"",textbutton:""}

    constructor(private parms : ActivatedRoute,private agencesapi:AgencesService,private route :Router,private service:ServicesService,private http:HttpClient){
   this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
      (result: any) => {
        console.log(result);
        
      
        this.data = result;
        this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
      console.log(this.data)
      }
      
      );
      this.parms.params.subscribe(query=>{
        return this.keyParams=query['val']
      });



      if (navigator.geolocation) {
    
        navigator.geolocation.getCurrentPosition((position) => {
          const coords = position.coords;
          const latLong = [coords.latitude, coords.longitude];
          console.log(
            `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
          );
        
          let mymap = L.map('map').setView(latLong, 13);
    
          L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
              attribution:
              
              {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18
              }
             
            }
          ).addTo(mymap);
    
          let marker = L.marker(latLong).addTo(mymap);
    
          marker.bindPopup('<b>I am Here</b>').openPopup();
    
        });
      }
        this.watchPosition();
     


    }
    watchPosition() {
      let desLat = 0;
      let desLon = 0;
      let id = navigator.geolocation.watchPosition(
        (position) => {
          console.log(
            `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
          );
          if (position.coords.latitude === desLat) {
            navigator.geolocation.clearWatch(id);
          }
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      
     
    }
  
   
    
    ngOnInit() { 
      
    
      this.agencesapi.getagenceparservice(this.keyParams).subscribe(
        (response: any) => {
          console.log(response);
          this.agences=response;
          this.gouvernorats = Array.from(new Set(response.map((agence: any) => agence.gouvernorat)));
          this.villes = Array.from(new Set(response.map((agence: any) => agence.ville)));
          console.log(this.villes)
         console.log(this.agences);

         this.locationmap(this.agences);
        },
        (error: any) => {
      console.log(error.error);
          
          
        }
      ); 
     
     
    }
  
   

    openLocationInMaps(latitude: number, longitude: number){
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, '_blank');
    }
    
    gotoagenda(id:any,ida:any)
    {
      this.route.navigate(['/agenda/'+this.keyParams+'/'+id+'/'+ida])
    }
    gotordv(id:any,ids:any)
    {
      this.route.navigate(['/agenda/'+id+'/'+ids])
    }
   
    gotodetails(code:any)
    {
      console.log(code)
      this.route.navigate(['/details/'+this.keyParams+'/'+code])
 
    }


    onSearchChange() {
      console.log(this.searchTerm);
    if(this.searchTerm.trim()!=null)
      {this.agencesapi.searchAgence(this.keyParams,this.searchTerm.trim()).subscribe(
        (response: any) => {
          console.log(response);
          this.agences = response;

          if(response.length==0)
      {
        this.message="No Agence found in the name of "+this.searchTerm.trim()
this.ngOnInit();
          setTimeout(() => {
            this.message="",
            this.searchTerm=""
                this.selectedCity="",
              this.selectedgouvernorat=""}, 3000);
      }
        },
        (error: any) => {
          console.log(error.error);
    
        }
      );
      }
      else
      {
        this.ngOnInit()
      }
     
    }
    onVilleChange() {
      console.log(this.selectedCity);
      if (this.selectedCity) {
        this.agencesapi.searchAgenceparVille(this.keyParams, this.selectedCity)
          .subscribe(
            (response: any[]) => {
              console.log(response);
              this.agences = response;

            },
            (error: any) => {
              console.log(error);
            }
          );
      } else {
        this.ngOnInit()
      }
    }
    ongouvernoratChange()
    {
      console.log(this.selectedCity);
      if (this.selectedgouvernorat) {
        this.agencesapi.searchAgenceparGouvernorat(this.keyParams, this.selectedgouvernorat)
          .subscribe(
            (response: any[]) => {
              console.log(response);
              this.agences = response;
            },
            (error: any) => {
              console.log(error);
            }
          );
      } else {
        this.ngOnInit()
      }
    }
    onSearchLibelleAndVilleChange()
    {
      console.log("hello search two");
   
        this.agencesapi.searchAgenceparVilleLibelle(this.keyParams, this.searchTerm,this.selectedCity)
          .subscribe(
            (response: any[]) => {
              console.log(response);
              this.agences = response;
              if(response.length==0)
              {
                this.message="No agence found in the name of "+this.searchTerm.trim()+" in "+this.selectedCity
        this.ngOnInit();
                  setTimeout(() => {
                    this.message="",
                    this.searchTerm=""
                this.selectedCity="",
              this.selectedgouvernorat=""}, 3000);
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
      
    }
    searchAgenceparLibelleGouvernoratChange()
    {
   
        this.agencesapi.searchAgenceparLibelleGouvernorat(this.keyParams, this.searchTerm,this.selectedgouvernorat)
          .subscribe(
            (response: any[]) => {
              console.log(response);
              this.agences = response;
              if(response.length==0)
              {
                this.message="No agence found in the name of "+this.searchTerm.trim()+" in "+this.selectedgouvernorat
        this.ngOnInit();
                  setTimeout(() => {
                    this.message="",
                    this.searchTerm=""
                this.selectedCity="",
              this.selectedgouvernorat=""}, 3000);
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
    }
    searchAgenceparVilleGouvernoratChange()
    {
   
        this.agencesapi.searchAgenceparVilleGouvernorat(this.keyParams, this.selectedCity,this.selectedgouvernorat)
          .subscribe(
            (response: any[]) => {
              console.log(response);
              this.agences = response;
              if(response.length==0)
              {
                this.message="No agence found in the name of "+this.selectedCity+" in "+this.selectedgouvernorat
        this.ngOnInit();
                  setTimeout(() => {
                    this.message="",
                    this.searchTerm=""
                this.selectedCity="",
              this.selectedgouvernorat=""}, 3000);
              }
            },
            (error: any) => {
              console.log(error);
            }
          );
    }
    searchAgenceparLibelleVilleGouvernoratChange()
    {
      this.agencesapi.searchAgenceparLibelleVilleGouvernorat(this.keyParams, this.searchTerm,this.selectedCity,this.selectedgouvernorat)
          .subscribe(
            (response: any[]) => {
              console.log(response);
              this.agences = response;
              if(response.length==0)
              {
                this.message="No agence found in the name of "+this.searchTerm+" in the city "+this.selectedCity+" in the gouvernorat "+this.selectedgouvernorat
        this.ngOnInit();
                  setTimeout(() => {
                    this.message="",
                  this.searchTerm=""
                this.selectedCity="",
              this.selectedgouvernorat=""}, 3000);
              }
            },
            (error: any) => {
              console.log(error);
            }
          ); 
    }
    onChange() {
      if (this.searchTerm && !this.selectedCity && !this.selectedgouvernorat) {
        this.onSearchChange();
      } else if (this.selectedCity && !this.searchTerm && !this.selectedgouvernorat) {
        this.onVilleChange();
      } 
      else if (!this.selectedCity && !this.searchTerm && this.selectedgouvernorat) {
        this.ongouvernoratChange()
      } else if (this.selectedCity && this.searchTerm && !this.selectedgouvernorat) {
        this.onSearchLibelleAndVilleChange();
      
      } 
      else if (this.selectedCity && !this.searchTerm && this.selectedgouvernorat) {
        this.searchAgenceparVilleGouvernoratChange();
      
      }
      else if (!this.selectedCity && this.searchTerm && this.selectedgouvernorat) {
        this.searchAgenceparLibelleGouvernoratChange();
      
      }
      else if (this.selectedCity && this.searchTerm && this.selectedgouvernorat) {
        this.searchAgenceparLibelleVilleGouvernoratChange();
      
      }else {
        this.ngOnInit();
      }
    }
    
   
    locationmap(agences:any) {
      // Create the map with a default zoom level
      let mymap = L.map('map').setView([agences[0].latitude, agences[0].longtitude], 13);
      
      // Add a tile layer
      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18
        }
      ).addTo(mymap);
    
      // Iterate over the list of agencies and add a marker for each one
      for (let i = 0; i < agences.length; i++) {
        let agence = agences[i];
        let latLongg = [agence.latitude, agence.longtitude];
        let marker = L.marker(latLongg).addTo(mymap);
    
        // create the left and right images
        var leftImg = `<img src="${this.data.image}" alt="Left Image" style="width:80px;height:80px;">`;
        var rightImg = '<img src="../../assets/img/people.png" style="width:80px;height:80px; ">';
    
        // create the list
        var list = '<ul style="list-style: none; padding: 0; margin: 0; text-align:left;">'+
                   '<li style="font-size:20px;"><b> ' + agence.libelle + '</b></li>' +
                   '<li style="font-size:15px;"><i class="fa fa-map-marker" style="color: #fd7e14;"></i> ' + agence.ville + '</li>' +
                   '<li style="font-size:15px;"><i class="fa fa-phone" style="color: #fd7e14;"></i> '+ agence.telephone+ '/'+ agence.fax+ '</li>' +
                   '</ul>';
    
        // combine the images and the text
        var popupText =  `
        <div style="display:flex;align-items:center;">
          ${leftImg}
          <div style="margin-left: 10px; margin-right: 10px; flex: 1;">
            ${list}
          </div>
          ${rightImg}
        </div>`;
    
        // bind the popup with the combined text and images
        marker.bindPopup(popupText, { maxWidth: 600 });
      }
    }



    review(id:any)
{
  let codeService
  this.service.getDetailsServiceParAgence(id,this.keyParams) .subscribe(
    (response: any) => {
      console.log(response);
      codeService=response.code_Service;
      this.route.navigate(['/avis/'+codeService+'/'+this.keyParams+'/'+id])

    },
    (error: any) => {
  console.log(error.error);
      
      
    }
  );
  console.log(codeService)
  
}

  }


