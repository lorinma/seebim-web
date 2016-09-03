import { Component, OnInit } from '@angular/core';
import {Project} from "./project";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button/button";
import {MD_INPUT_DIRECTIVES} from "@angular2-material/input/input";
import {MD_ICON_DIRECTIVES} from "@angular2-material/icon/icon";
import {MdIconRegistry} from "@angular2-material/icon/icon-registry";
import {ProjectService} from "../project.service";

@Component({
  moduleId: module.id,
  selector: 'app-project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
  ],
  providers:[
    ProjectService,
    MdIconRegistry
  ]
})
export class ProjectListComponent implements OnInit {
  constructor (private _service: ProjectService,private router: Router) {
  }
  projects:Project[];
  formShowing=false;
  errorMessage: string;

  //get all projects
  ngOnInit() {
    this.getProjects();
  }
  getProjects() {
    this._service.getProjects()
      .subscribe(
        projects => this.projects = projects,
        error =>  this.errorMessage = <any>error);
  }

  // add new project
  addProject(name:string,desc:string){
    let newProject={
      name:name,
      description:desc
    }
    this._service.addProject(newProject)
      .subscribe(
        project => {
          this.formShowing=false;
          this.projects.push(project);
        },
        error => this.errorMessage = <any>error
      );
  }

  deleteProject(project:Project){
    this._service.deleteProject(project)
      .subscribe(
        result => {
          if(result){
            let inx = this.projects.indexOf(project);
            this.projects.splice(inx,1);
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  checkProject(project:Project){
    this.router.navigate(['/dashboard/project/'+project._id])
  }
}
