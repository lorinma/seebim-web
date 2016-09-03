import {Component, OnInit} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import {DashboardComponent } from './+dashboard';
import {WelcomeComponent } from './+welcome';
import {AuthService} from "./auth.service";
import {AngularFire} from "angularfire2/angularfire2";
import {User} from "./user";

@Component({
  moduleId: module.id,
  selector: 'see-bim-app',
  templateUrl: 'see-bim.component.html',
  styleUrls: ['see-bim.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
  ],
  providers: [
    ROUTER_PROVIDERS,
    AuthService,
  ],
})
@Routes([
  {path: '/dashboard', component: DashboardComponent},
  {path: '/welcome', component: WelcomeComponent},
])
export class SeeBIMAppComponent implements OnInit {
  private guid:string;
  private file_id:string;
  private errorMessage:string;
  public title = "SeeBIM";

  constructor(private router:Router, private af:AngularFire, private _auth:AuthService) {
  }

  ngOnInit() {
    this.guid = "1neCd5WeH1qx3IONn73kmD";
    this.file_id = "57699353e7608a100116d338";
    this.af.auth.subscribe(
      auth => {
        if (auth) {
          let user:User;
          user = {
            firebase_uid: auth.uid,
            family_name: auth.google.cachedUserProfile.family_name,
            given_name: auth.google.cachedUserProfile.given_name,
            gender: auth.google.cachedUserProfile.gender,
            name: auth.google.cachedUserProfile.name,
            picture: auth.google.cachedUserProfile.picture
          };
          this._auth.addUser(user).subscribe(
            user => {
              if (user) {

              }
            },
            error => this.errorMessage = <any>error
          );
          this.router.navigate(['/dashboard']);
        }
        else {
          this.router.navigate(['/welcome']);
        }
      }
    );
  }
}
