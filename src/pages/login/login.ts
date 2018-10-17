import { TabsPage } from './../tabs/tabs';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  username: String;
  password: String;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,private authProvider: AuthProvider) {

  }

  signIn() {
    if(this.auth()){
      this.authProvider.login(this.username, this.password).subscribe((resp) => {
        console.log('Logged in successfully', resp);
  
        // If you app has Tabs, set root to TabsPage
        this.navCtrl.setRoot(TabsPage)
      }, err => {
        console.log('Error logging in', err);
  
        this.toastCtrl.create({
          message: err.message,
          duration: 2000
        }).present();
      });
    }else {
      this.presentToast();
    }
   
  }

  auth(){
    if(this.username === "" || this.password === "") {
        return false;
    }
    if(this.username === "test" && this.password === "test"){
      return true;
    }
    return false;
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Invalid login details',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
