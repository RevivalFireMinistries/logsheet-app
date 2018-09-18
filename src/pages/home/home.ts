import { Member } from './../../app/shared/member';
import { MembersService } from './../../app/services/members.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  //today: string = moment().format('D MMM YYYY');

  constructor(public navCtrl: NavController, private memberService: MembersService) {

  }

  ngOnInit() {
    this.memberService.getMembers()
      .subscribe((function(data){
        this.members = data;
      }).bind(this));
  }

}
