import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit{
  title = 'SeeBIM';
  constructor(private auth: AuthService) {

  }
  ngOnInit(){
    // if(!this.auth.authenticated()){
    //   this.auth.login();
    // }
  }
}
