import {Component} from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {AuthMethods, AuthProviders, AngularFire} from "angularfire2/angularfire2";
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
  ],
  providers:[
  ]
})
export class WelcomeComponent{
  // user:User;
  title='SeeBIM';
  vc_img='../VCLab.png';
  private errorMessage:string;
  constructor(private af:AngularFire) {
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

}
