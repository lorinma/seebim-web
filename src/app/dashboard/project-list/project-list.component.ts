import { Component, OnInit } from '@angular/core';
import {Project} from "../project";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.css'],
  providers: [
    ProjectService
  ]
})
export class ProjectListComponent implements OnInit {
  private projects:Project[];
  private errorMessage:string;
  //change!!!!!!!!!!!!!!
  private user_id='ling';
  private formShowing=false;
  constructor(private _service:ProjectService) { }

  ngOnInit() {
    this.getProject(this.user_id);
  }

  getProject(user_id:string) {
    this._service.getProjects(user_id).subscribe(
      res=>{
        this.projects=res;
      },
      error => this.errorMessage = <any>error
    )
  }
  deleteProject(project:Project) {
    let _id=project._id;
    let inx = this.projects.indexOf(project);
    this.projects.splice(inx,1);
    this._service.deleteProject(_id).subscribe(
      res=>{
      },
      error => this.errorMessage = <any>error
    )
  }
  // add new project
  addProject(name:string,desc:string){
    let newProject={
      'Name':name,
      'Description':desc,
      'UserID':this.user_id,
    };
    this._service.addProject(newProject)
      .subscribe(
        project => {
          this.formShowing=false;
          this.projects.push(project);
        },
        error => this.errorMessage = <any>error
      );
  }
}
