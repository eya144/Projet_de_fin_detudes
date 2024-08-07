import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import * as moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { timeInterval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-eyaagenda',
  templateUrl: './eyaagenda.component.html',
  styleUrls: ['./eyaagenda.component.css'],
  providers: [DatePipe], // add DatePipe to the providers array

})
export class EyaagendaComponent  implements OnInit {
  eventss: any=[];
  time:any;
  calendarOptions: any;
  keyParams: any;
  valParams: any;
  lastTime: any;
  oktime=false;
  selectedDate:any;
  dataevent= {
    "Subject":"",
    "Body": {
      "ContentType": "HTML",
      "Content": ""
    },
    
    "Start": {
        "DateTime": "",
        "TimeZone":"UTC"
    },
    "End": {
        "DateTime": "",
        "TimeZone":"UTC"

    },

    "Attendees": [
      {
        "EmailAddress": {
          "Address": "",
          "Name": ""
        },
        "Type": "Required"
      }
    ],
    "Organizer": {
      "EmailAddress": {
          "Name": "Utilisateur 1",
          "Address": "user1@ed.loc"
      }
  },
      "Location": {
        "DisplayName": ""
    },
    "ReminderMinutesBeforeStart":15,
    "BodyPreview":null
  }
  Messagesuccess: any;
  Messageerror: any;
  telephone:any
  email:any
  data:any ={ textcolor :""}
  disabledHours: number[] = [0,1,2,23];
  codeParams:any;
  msgsuccess:any
  msgfail:any
  deja:any
  Heure:any
  Weekends:any
  notOpen:any
  day: any;
  constructor(private http:HttpClient,private apiService: CalendarService,private parms:ActivatedRoute,private datePipe:DatePipe,private authservice:AuthService,private translate: TranslateService) {
    this.parms.params.subscribe(query=>{
      return this.keyParams=query['key']
    })
    console.log(this.keyParams)
    this.parms.params.subscribe(query=>{
      return this.valParams=query['val']
    })
    this.parms.params.subscribe(query=>{
      return this.codeParams=query['vala']
    })
    this.telephone=this.authservice.getClientDataFromToken().telephone
    this.email=this.authservice.getClientDataFromToken().email
    //let x = document.getElementById('rdvdate')?.daterangepicker();
    if (this.translate.currentLang ==="En") {
      this.msgsuccess="Add Successfully"
      this.msgfail="failed to add!"
      this.deja="There is already an appointment in this schedule, please choose another schedule"
      this.Heure='Time not valid !!'
      this.Weekends='Weekends not allowed !!'
      this.notOpen='service does not work on that time'
    } else {
      this.msgsuccess="Ajouter Avec Success"
      this.msgfail="échec de l'ajout!"
      this.deja="Il ya deja un rendez-vous dans cette horraire ,Veillez choisir un autre horraire !!"
      this.Heure='Heure non valide !!'
      this.Weekends='Fin de semaine !!'
      this.notOpen='le service ne fonctionne pas à cette heure'
    }
   }
  ngOnInit() {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    }
    
    );

    this.eventss = this.getData();
  
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'listWeek',
      initialDate: new Date(), // Set initial date to today
      hiddenDays: [0],     
       headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      events: this.eventss,
      eventClick: (info: { event: { extendedProps: { data: boolean; }; start: moment.MomentInput; end: moment.MomentInput; }; }) => {
        if (info.event.extendedProps.data) {
         
          if (this.translate.currentLang ==="En") {
            Swal.fire(
              'Error',
              'This event is already reserved! from '+moment(info.event.start).format('HH:mm') +' to '+moment(info.event.end).format('HH:mm')+ ' ',
              'error'
            )
            } else {
              Swal.fire(
                'Erreur',
                'Cet événement est déjà réservé ! de '+moment(info.event.start).format('HH:mm') +' à '+moment(info.event.end).format('HH:mm')+ ' ',
                'error'
              )
           }
        } 
      },
      eventDidMount: (info: { event: { extendedProps: { data: any; }; start: moment.MomentInput; end: moment.MomentInput; }; el: { style: { backgroundColor: string; }; innerHTML: string; }; }) => {
        if (info.event.extendedProps.data) {
          info.el.style.backgroundColor = '#FF0000';
          info.el.innerHTML = moment(info.event.start).format('HH:mm') + '/' + moment(info.event.end).format('HH:mm');

        } else {
          info.el.style.backgroundColor = '#00e600'; // set background color to green
        }
      },
    };
  }

  async getData() {
    const events = [];
    const data = await this.apiService.fetchDataFromServer(this.codeParams,this.keyParams);

    if (data === null) {
      
      return [];
    }

    for (const event of data.value) {
      const start = moment.utc(event.Start.DateTime, 'YYYY-MM-DDTHH:mm:ss').format();
      const end = moment.utc(event.End.DateTime, 'YYYY-MM-DDTHH:mm:ss').format();
      
      const record = { start, end };
      
      events.push({
        start,
        end,
        data: true
      });
    }
    
    this.eventss = events;

    return events;
  }

  async addrdv(f:NgForm) {
    let data =f.value
    if (!f.valid) {
      if (this.translate.currentLang ==="En") {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Invalid form !',
        })
        return ;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur...',
            text: 'Remplir tous les champs de la formulaire !',
          })
          return ;
       }
     
    }
   
    let durationMs = data.duree * 60 * 1000; // convert duration from minutes to milliseconds
    data.time=new Date(data.time)
  // data.time.setHours(data.time.getHours() + 1);
    data.time=data.time.toISOString();

    let timeMs = new Date(data.time).getTime(); // convert time to milliseconds

    let lastTimeMs = timeMs + durationMs;
    let lastTime = new Date(lastTimeMs);
    lastTime.setHours(lastTime.getHours() - 1);

    this.lastTime=lastTime.toISOString();

    this.lastTime = this.datePipe.transform(lastTime, 'yyyy-MM-ddTHH:mm'); 
    this.dataevent.Start.DateTime=data.time;
    this.dataevent.End.DateTime=this.lastTime;
    this.dataevent.Subject=data.sujet;
    this.dataevent.BodyPreview=this.keyParams;
    this.dataevent.Attendees[0].EmailAddress.Address=this.email
    this.dataevent.Attendees[0].EmailAddress.Name=this.authservice.getClientDataFromToken().telephone
    this.dataevent.Location.DisplayName=this.valParams;
    this.dataevent.ReminderMinutesBeforeStart=parseInt(data.duree)
    let originalDateTime = this.dataevent.End.DateTime;
    let utcDateTime = new Date(originalDateTime + 'Z');
    let pstDateTime = new Date(utcDateTime.getTime() - 7 * 60 * 60 * 1000);
    let pstDateTimeString = pstDateTime.toISOString().slice(0, 16);
    
    switch(moment(this.selectedDate).day()) {
      case 0:
        this.day = "Dimanche"
        break;
      case 1:
        this.day = "Lundi"
        break;
      case 2:
      this.day = "Mardi"
      break;
      case 3:
      this.day = "Mercredi"
      break;
      case 4:
      this.day = "Jeudi"
      break;
      case 5:
      this.day = "Vendredi"
      break;
      case 6:
      this.day = "Samedi"
      break;
      default:
        // code block
    }
    const agenceActive = (await this.apiService.checkRdvAvailable(this.codeParams,moment(this.selectedDate).hours(),this.day)).subscribe(( av  ) => {

      console.log(av)
      if (av === false){
        Swal.fire(
          'Error',
          this.notOpen,
          'error'
        )
        return;
      }
      if (! this.isDisabled()){
        console.log("no valid date")
        return;
      }else{
        if(this.eventss.length != 0){
        if(this.checkdate(this.eventss,data.time,this.lastTime))
        {
          if(this.apiService.addDataFromServer(this.codeParams,this.keyParams,this.dataevent)!=null)
            {
              this.authservice.SendRDVEmailNotif({
                email:this.email,
                subject :this.dataevent.Subject,
                Start :this.dataevent.Start.DateTime,
                End :this.dataevent.End.DateTime,
                Location :this.dataevent.Location.DisplayName
              })
            this.eventss=this.getData()
            this.ngOnInit()
            if (this.translate.currentLang ==="En") {
            Swal.fire(
              'Success',
              this.msgsuccess,
              'success'
            )
            }else{
              Swal.fire(
                'Succès',
                this.msgsuccess,
                'success'
              )
            }
          this.Messagesuccess=this.msgsuccess;
          this.Messageerror=null;
          }
        else{
          this.Messageerror="failed to add !!";
          this.Messagesuccess=null;
          if (this.translate.currentLang ==="En") {
            Swal.fire(
              'Error',
              this.msgfail,
              'error'
            )}else{
              Swal.fire(
                'Erreur',
                this.msgfail,
                'error'
              )
            }
        }
        }
        else{
          this.Messagesuccess=null
          this.Messageerror=this.deja
          if (this.translate.currentLang ==="En") {
            Swal.fire(
              'Error',
              this.deja,
              'error'
            )}else{
              Swal.fire(
                'Erreur',
                this.deja,
                'error'
              )
            }
        }
      }
      else{
        if(this.apiService.addDataFromServer(this.codeParams,this.keyParams,this.dataevent)!=null)
        {
        this.authservice.SendRDVEmailNotif({
          email:this.email,
          subject :this.dataevent.Subject,
          Start :this.dataevent.Start.DateTime,
          End :this.dataevent.End.DateTime,
          Location :this.dataevent.Location.DisplayName
        })
        this.eventss=this.getData()
        this.ngOnInit()
  
        if (this.translate.currentLang ==="En") {
        Swal.fire(
          'Success',
          this.msgsuccess,
          'success'
  
        )
        }else{
          Swal.fire(
            'Succès',
            this.msgsuccess,
            'success'
          )
        }
      this.Messagesuccess=this.msgsuccess;
      this.Messageerror=null;
      }
      }
  
        
      }
    });
    console.log("agenceActive")
}
  now = new Date();

  // Define the minimum and maximum times
  minTime = '08:00';
  maxTime = '17:00';

  // Define the minimum and maximum dates
  minDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
  maxDate = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0);

  // Calculate the minimum and maximum date-times
  minDateTime() {
    return `${this.dateToString(this.minDate)}T${this.minTime}`;
  }

  maxDateTime() {
    return `${this.dateToString(this.maxDate)}T${this.maxTime}`;
  }

  // Check if the date is disabled
  isDisabled() {
    const today = new Date();
    console.log(this.selectedDate);
    const d = new Date(this.selectedDate);
    let hour = d.getHours();
    var day = new Date(d).getUTCDay();
    console.log(day);
    console.log(hour);
    let stamp= Date.parse(this.selectedDate);
    if (Date.now() > stamp ) {
      if (this.translate.currentLang ==="En") {

        Swal.fire(
          'Error',
          this.Heure,
          'error'
        )}else{
          Swal.fire(
            'Erreur',
            this.Heure,
            'error'
          )
        }
      this.oktime=false;
      return false;
    }
    if([0].includes(day)){
      if (this.translate.currentLang ==="En") {

        Swal.fire(
          'Error',
          this.Weekends,
          'error'
        )}else{
          Swal.fire(
            'Erreur',
            this.Weekends,
            'error'
          )
        }
      this.oktime=false;
      return false;
    }
    console.log("ladttime",this.lastTime)
    let hourslasttime=new Date(this.lastTime).getHours()
    let minuteslasttime=new Date(this.lastTime).getMinutes()

    console.log("last time hours " ,hourslasttime,minuteslasttime)
    if([6].includes(day) && hour >=13 ){
      if (this.translate.currentLang ==="En") {

        Swal.fire(
          'Error',
          this.Weekends,
          'error'
        )}else{
          Swal.fire(
            'Erreur',
            this.Weekends,
            'error'
          )
        }
      this.oktime=false;
      return false;
    }
    if (this.disabledHours.indexOf(hour) >= 0) {
      //const selectedHour = new Date(this.selectedDate).getHours();
      if (this.translate.currentLang ==="En") {

        Swal.fire(
          'Error',
          this.Heure,
          'error'
        )}else{
          Swal.fire(
            'Erreur',
            this.Heure,
            'error'
          )
        }
      this.oktime=false;
      return false;
    }
    this.oktime=true;
    console.log("valid");
    return true;
  }

  // Helper method to convert a date to string
  dateToString(date: Date) {
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    return `${year}-${month}-${day}`;
  }

  // Helper method to pad a number with leading zero
  padNumber(num: number) {
    return num.toString().padStart(2, '0');
  } 
  
   checkdate(rdvList: any[], specificStartTime: string, specificEndTime: string): boolean {
    let test = true;
    const formattedSpecificStartTime = moment(specificStartTime, 'YYYY-MM-DDTHH:mm');
    const formattedSpecificEndTime = moment(specificEndTime, 'YYYY-MM-DDTHH:mm');
    if(rdvList.constructor !== Array) {
      return test;
    }

    for (const rdv of rdvList) {
      const end = moment(rdv.end.slice(0, 16), 'YYYY-MM-DDTHH:mm');
      const start = moment(rdv.start.slice(0, 16), 'YYYY-MM-DDTHH:mm');
      
      console.log(rdv.end, " ", rdv.start.slice(0, 16), " ", specificEndTime, " ", specificStartTime);
  
      if ((start.isBefore(formattedSpecificEndTime) && end.isAfter(formattedSpecificStartTime)) ||
        (formattedSpecificStartTime.isBefore(end) && formattedSpecificEndTime.isAfter(start))) {
        console.log('Conflict!');
        test = false;
      }
      else if (start==formattedSpecificEndTime)  {
      console.log('Success!');
      test=true
    }
    else if ( end==formattedSpecificStartTime)  {
      test=true
      console.log('Success!');
    }
    
    }
  
    return test;
  }
  

 
}
