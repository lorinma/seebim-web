import { Component, OnInit } from '@angular/core';

// import {MD_TOOLBAR_DIRECTIVES} from "@angular2-material/toolbar";
// import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button";
// import {MD_SIDENAV_DIRECTIVES} from "@angular2-material/sidenav";
// import {MD_LIST_DIRECTIVES} from "@angular2-material/list";
// import {MD_ICON_DIRECTIVES} from "@angular2-material/icon";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // directives: [
    // MD_BUTTON_DIRECTIVES,
    // MD_TOOLBAR_DIRECTIVES,
    // MD_SIDENAV_DIRECTIVES,
    // MD_LIST_DIRECTIVES,
    // MD_ICON_DIRECTIVES
  // ]
})
export class DashboardComponent implements OnInit {
  user={
    name:"Ling"
  };
  title='SeeBIM';
  vc_img='../VCLab.png';
  sidebars: Object[] = [
    {
      name: "Dashboard",
      description: "View my project list",
      icon: "assignment ind",
      route: '../dashboard'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
