import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2/angularfire2";
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIconRegistry, MD_ICON_DIRECTIVES} from '@angular2-material/icon';
import { ProjectListComponent } from './+project-list';
import { Routes , ROUTER_DIRECTIVES} from '@angular/router';
import { ProjectComponent } from './+project';
import {ModelViewerComponent} from "./+model-viewer/model-viewer.component";
import {AuthService} from "../auth.service";
import {User} from "../user";

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    ROUTER_DIRECTIVES,
  ],
  providers: [
    MdIconRegistry,
  ],
})

@Routes([
  {path: '/project-list', component: ProjectListComponent},
  {path: '/project/:id', component: ProjectComponent},
  {path: '/model-viewer/:id', component: ModelViewerComponent}

])
export class DashboardComponent implements OnInit{
  user:User
  title="SeeBIM";
  vc_img='../VCLab.png';
  sidebars: Object[] = [
    {
      name: "Dashboard",
      description: "View my project list",
      icon: "assignment ind",
      route: './project-list'
    },
    // {
    //   name: "Viewer",
    //   description: "3D viewer",
    //   icon: "airplay",
    //   route: '/welcome'
    // }
  ];
  constructor (private _auth:AuthService, private router: Router, private af:AngularFire){
  }
  ngOnInit(){
    this.user=this._auth.user
    this.router.navigate(['/dashboard/project-list']);
  }
  logout() {
    // this._auth.user=null;
    this.af.auth.logout();
    this.router.navigate(['/welcome']);
  }
}
