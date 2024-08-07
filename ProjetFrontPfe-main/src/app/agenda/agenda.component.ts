import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [DatePipe], // add DatePipe to the providers array

})
export class AgendaComponent {
  selectedEvent: any;
  data:any={textcolor:""}
  eventss: any;
  time:any;
  calendarOptions: any;
  keyParams: any;
  valParams: any;
  lastTime: any;
  Event:any
  email:any=""
  Messagesuccess: any;
  Messageerror: any;
  serviceName:any =""
  filterdat:any
  Id:any
  telephone:any
  dataevent= {
    "Id":"",
    "Subject":"",
   
    
    "Start": {
        "DateTime": "",
        "TimeZone":"UTC"
    },
    "End": {
        "DateTime": "",
        "TimeZone":"UTC"

    },
    "ReminderMinutesBeforeStart":15,
 
  }


@ViewChild('myModal') modal: any;

  constructor(private translate : TranslateService,private http:HttpClient,private parms : ActivatedRoute,private apiService: CalendarService,private authservice:AuthService) {
    
  this.parms.params.subscribe(query=>{
    return this.keyParams=query['key']
  });
  this.parms.params.subscribe(query=>{
    return this.valParams=query['val']
  });
  this.telephone=this.authservice.getClientDataFromToken().telephone
  this.email = this.authservice.getClientDataFromToken().email
  }


  filterData() {
    console.log('hello');
    console.log('hello',this.eventss)
    this.filterdat = this.eventss.filter((event: any) =>
    event.Attendees.some(
      (attendee: any) =>
        attendee.EmailAddress.Name.includes(this.telephone)
    )
  );
  console.log('vfggvheg')
  console.log(this.filterdat)
  }
  


  ngOnInit() {
    this.http.get(`https://codebackend-production.up.railway.app/formcontenu`).subscribe(
    
    (result: any) => {
      console.log(result);
      
    
      this.data = result;
      this.data.image=`https://codebackend-production.up.railway.app/getLogo/${this.data.image}`
    console.log(this.data)
    }
    
    );
  this.getData(this.keyParams,this.valParams);

 console.log("filter",this.filterdat)
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'listWeek',
      hiddenDays: [0],
      headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      views: {
        listWeek: {
          buttonText: 'agenda',
          displayEventTime: false,
          eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }
        }
      },
      events: this.filterdat,
      eventClick: (info: { event: { id: any }; }) => {
        if (this.translate.currentLang ==="En") {
        Swal.fire({
          title: 'Do you want to delete your Appointment?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          const { id } = info.event;
          if (result.isConfirmed) {
      
            this.delete(this.keyParams, this.valParams, id);
          
          Swal.fire(
            'Deleted !',
            'Appointment has already been deleted..',
            'success'
          );
        }
      });
      }
      else{   
        Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer rendez-vous ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        const { id } = info.event;
        if (result.isConfirmed) {
    
          this.delete(this.keyParams, this.valParams, id);

        Swal.fire(
          'Supprimé !',
          'rende a été supprimé.',
          'success'
        );
      }
    });
    }},
    slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
     
      eventTextColor: '#000000'
    };
    console.log("this is name");
    console.log(this.serviceName);
  }

 
async getData(codea:any,codes:any) {
        const events = [];

        console.log('hellor')
        this.serviceName = codea;
        const data = await this.apiService.fetchDataFromServer(codea,codes);
        if (data === null) return;
        this.eventss=data.value
        console.log('fdz',this.eventss)
       this.filterData();
       console.log(data.value)
        for (const event of this.filterdat) {
          const start = moment.utc(event.Start.DateTime, 'YYYY-MM-DDTHH:mm:ss').format();
          const end = moment.utc(event.End.DateTime, 'YYYY-MM-DDTHH:mm:ss').format();
          
          const record = { start, end };
          
          events.push({
            title: event.Subject,
            id:event.Id,
            agent:event.Organizer.EmailAddress.Address,
            start: start,
            end: end,

            location: event.Location.DisplayName
          });
        }
  
this.filterdat=events
    }

  
    



    delete(codea:any,codes:any,id:any) {

      
      this.apiService.deleteDataFromServer(codea,codes,id).subscribe(
        () => {
          console.log('Event deleted successfully');
          this.authservice.SendRDVEmailNotifDelete(this.email,this.serviceName)
          this.ngOnInit()  
       
        },
        (error:any) => {
          console.error('Error deleting event', error);
         
        }
      );
    }
    /* openModal(info: any) {
  
    console.log('info',info.event)
    console.log('open modal');
    const modal = this.modal.nativeElement;
    modal.style.display = 'block';
    this.Id=info.event._def.publicId,
console.log(this.Id)

this.apiService.fetchEventFromServer(this.keyParams,this.valParams,this.Id).subscribe(
    
  (result: any) => {
    console.log(result);
    
  
    this.Event = result;
 console.log(this.Event)
 this.dataevent.Id=this.Event.Id

 this.dataevent.Subject=this.Event.Subject
 this.dataevent.Start.DateTime=this.formatDateTime(this.Event.Start.DateTime)
 this.dataevent.End.DateTime=this.formatDateTime(this.Event.End.DateTime)
 this.dataevent.ReminderMinutesBeforeStart=this.Event.ReminderMinutesBeforeStart
  }
  
  );


  }
  updateEndDate() {
    const startDate = new Date(this.dataevent.Start.DateTime);
    const duration = Number(this.dataevent.ReminderMinutesBeforeStart);
  
    const endDate = new Date(startDate.getTime() + duration * 60000); // Add duration in milliseconds
  
    this.dataevent.End.DateTime = this.formatDateTime(endDate.toISOString());
  }
  
  formatDateTime(dateTime: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateTime, 'yyyy-MM-ddTHH:mm') || '';
  }
 
  closeModal() {
    console.log('close modal');
    const modal = this.modal.nativeElement;
    modal.style.display = 'none';
    this.Messageerror=""
    this.Messagesuccess=""
    this.Id=""
    this.ngOnInit()
  }

  async getALLRDV(codea:any,codes:any) {
  const events = [];

  console.log('hellor')

  const data = await this.apiService.fetchDataFromServer(codea,codes);
  this.eventss=data.value
  console.log('fdz',this.eventss)
 console.log(data.value)
  for (const event of this.eventss) {
    const start = moment.utc(event.Start.DateTime, 'YYYY-MM-DDTHH:mm:ss').subtract(1, 'hour').format();
    const end = moment.utc(event.End.DateTime, 'YYYY-MM-DDTHH:mm:ss').subtract(2, 'hour').format();
    
    const record = { start, end };
    
    events.push({
      title: event.Subject,
      id:event.Id,
      agent:event.Organizer.EmailAddress.Address,
      start: start,
      end: end,

      location: event.Location.DisplayName
    });
  }

this.filterdat=this.eventss
}

 update(f:any) {
      console.log(f.value)
      console.log('Update button clicked');
      if(this.checkdate(this.eventss,f.time,this.lastTime))
      {
        if(this.apiService.updateEventFromServer(this.keyParams,this.valParams,this.dataevent)!=null)
        {console.log("success")
        console.log("eventtest",this.dataevent)
      
      this.Messagesuccess="added it successsfully";
      this.Messageerror=null;
      setTimeout(() => {
      this.ngOnInit()}, 2000);
      this.getData(this.keyParams,this.valParams)
      }
         
        
      
      
      else{
        console.log("echec")
      
        this.Messageerror="failed to add !!";
        this.Messagesuccess=null;
      }
      
      }
      else{
        this.Messagesuccess=null
        this.Messageerror="There is another rdv in the same date please check again !!"
      }
      
    }
  checkdate(rdvList: any[], specificStartTime: string, specificEndTime: string): boolean {
    let test = true;
  
    const formattedSpecificStartTime = moment(specificStartTime, 'YYYY-MM-DDTHH:mm');
    const formattedSpecificEndTime = moment(specificEndTime, 'YYYY-MM-DDTHH:mm');
  
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
*/
}
