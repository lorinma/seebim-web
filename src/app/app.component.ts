import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit{
  title = 'SeeBIM';
  constructor(private auth: AuthService, private router: Router) {

  }
  ngOnInit(){
    // if(!this.auth.authenticated()){
    //   this.router.navigate(['login'])
    // }
    // if(this.auth.authenticated()){
    //   this.router.navigate(['dashboard'])
    // }
    this.router.navigate(['dashboard'])
  }
}
