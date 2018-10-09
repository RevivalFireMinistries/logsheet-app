import { Member } from './../../app/shared/member';
import { MembersService } from './../../app/services/members.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { AboutPage } from '../about/about';
//import * as moment from 'moment';
//declare var moment: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public members: Member[];

  public filter: Member = new Member();

  public serviceDate: String = new Date().toDateString();

  public totalAttendance: number = 0;


  constructor(public navCtrl: NavController, private memberService: MembersService, public loadingCtrl:LoadingController) {

  }

  ngOnInit() {
    this.memberService.getMembers()
      .subscribe((function(data){
        this.serviceDate = new Date().toLocaleDateString();
        this.members = data;
        for(let m of this.members){
          m.present = false;
        }
      }).bind(this));
  }

  updateAttendance() {
  let total = 0;
   for(let i=0;i<this.members.length;i++){
     if(this.members[i].present === true){
       total += 1;
     }
   }
   this.totalAttendance = total;
  }

 onSave(){
  if(this.serviceDate !== null) {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    loading.present();

    let logSheet = {
      eventDate : this.serviceDate,
      attendance : {
      }
    }
    this.members.forEach(function (m) {
      let attendanceVar = m.present ? 'Present' : 'Absent';
      logSheet.attendance[m.fullName] = attendanceVar;
    });
   this.memberService.saveLogSheet(logSheet)
   .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
                      val);
        },
      response => {
        this.navCtrl.push(AboutPage);
        loading.dismiss();
      },
      () => {
          console.log("The POST observable is now completed.");
      }
  );
  }
 }

}
