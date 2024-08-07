import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencesService } from '../services/agences.service';
import { HttpClient } from '@angular/common/http';
declare const L:any;
@Component({
  selector: 'app-detailsagence',
  templateUrl: './detailsagence.component.html',
  styleUrls: ['./detailsagence.component.css']
})
export class DetailsagenceComponent {

 
  title = 'locationApp';
 
horairesNumber=0;
keyParams: any;
horaires:any
horairesamedistart: any;
horairesamediend: any;
pause:any
choixsamedi=false
horaireCommun:any
latitude:any
longitude:any
detailsofagence: any={libelle:""};
valParams: any;
currentUser: any = {photo:"",telephone:""}
  data:any={textcolor:"",textbutton:"",detailimage:""}
services:any
  constructor(private http:HttpClient ,private parms : ActivatedRoute,private agencesapi:AgencesService,private route :Router){

    this.parms.params.subscribe(query=>{
      return this.keyParams=query['key']
    })
    console.log(this.keyParams)
    this.parms.params.subscribe(query=>{
      return this.valParams=query['val']
    })
   
    if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;
      console.log("donnes",this.latitude,this.longitude);
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
         
        }
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b>I am Here</b>').openPopup();

    });
   
   
  }
    this.watchPosition();
  }

  
  ngOnInit() { 
   this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      console.log(result);
      
    
      this.data = result;
      this.data.detailimage=`https://codebackend-production.up.railway.app/getLogo/${this.data.detailimage}`

      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    console.log(this.data)
    }
    
    );
    this.agencesapi.getAgencedetails(this.valParams).subscribe(
      (response: any) => {
        console.log(response);
        this.detailsofagence=response;
        this.detailsofagence.dateCreation=this.formatDate(this.detailsofagence.dateCreation)

        this.agencesapi.getDetailsHoraires(this.valParams).subscribe(
          (result: any) => {
            this.horaires = result;
            this.horaires.forEach((horaire: any) => {
    
              if (horaire.dayOfWeek == "Samedi") {
                this.horairesamedistart=horaire.startTime
                this.horairesamediend=horaire.endTime
                this.choixsamedi=true;

              }
              
              if (horaire.dayOfWeek == "Lundi") {
                this.pause = horaire.pause;
                this.horairesNumber=1
                this.horaireCommun=horaire
              }
              
            });
    
    
          }
        );
        this.locationmap(this.detailsofagence.latitude,this.detailsofagence.longtitude,this.detailsofagence)
      },
      (error: any) => {
    console.log(error.error);
        
        
      }
    ); 
   this.agencesapi.getServicesBycodeAgence(this.valParams).subscribe(
    (response: any) => {
      console.log(response);
      this.services=response;
  },
    (error: any) => {
  console.log(error.error);
      
      
    }
  ); 

   
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


  openLocationInMaps(latitude: number, longitude: number){
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
  
  gotoagenda()
  {
    this.route.navigate(['/agenda/'+this.keyParams+'/'+this.valParams])
  }
  locationmap(latitude:any,longitude:any,agence:any) {
    {
    // Convert the latitude and longitude values to numbers
    console.log(latitude,longitude);
  
    
    // Create the map with a default zoom level
    let latLongg = [Number(latitude), Number(longitude)];
    let latLng = L.latLng(latLongg[0], latLongg[1]);
    console.log("latitudee:", latLongg[0], "longitudee:", latLongg[1]);
    
    let mymap = L.map('map').setView(latLng, 13);
    // Add a tile layer
  
    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',        {
        attribution:
        
        {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 12,
          minZoom:8
        }
        }
    ).addTo(mymap);
    
    // Add a marker with a popup
    let marker = L.marker(latLng).addTo(mymap);
  // create the left and right images
  var leftImg = `<img src="${this.data.image}" alt="Left Image" style="width:100px;height:100px;">`;
  var rightImg = '<img src="../../assets/img/people.png" style="width:80px;height:80px; ">';
  
  // create the list
  // create the list
  var list = '<ul style="list-style: none; padding: 0; margin: 0; text-align:left;">'+
             '<li style="font-size:20px;"><b> ' + agence.libelle + '</b></li>' +
             '<li style="font-size:15px;"><i class="fa fa-map-marker" style="color: #fd7e14;"></i> ' +agence.ville + '</li>' +
             '<li style="font-size:15px;"><i class="fa fa-phone" style="color: #fd7e14;"></i> '+agence.telephone + '</li>' +
             '<li style="font-size:15px;"><i class="fa fa-phone" style="color: #fd7e14;"></i> '+agence.fax + '</li>' +
  
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
  marker.bindPopup(popupText, { maxWidth: 600 }).openPopup();
  
    }
    }
    formatDate(date: string) {
      return new Date(date).toISOString().slice(0, 10);
    }
}


