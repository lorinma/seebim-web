import { Component, OnInit } from '@angular/core';
import {MdIcon, MdIconRegistry} from  '@angular2-material/icon/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    MdIconRegistry
  ]
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
