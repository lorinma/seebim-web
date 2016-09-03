import { Component, OnInit} from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {MD_BUTTON_DIRECTIVES} from "@angular2-material/button/button";
import {MD_ICON_DIRECTIVES} from "@angular2-material/icon/icon";
import {MdIconRegistry} from "@angular2-material/icon/icon-registry";
import {NewFileComponent} from "./new-file/new-file.component";
import {FileService} from "../file.service";
import {ProjectService} from "../project.service";
import {File} from "./file";

@Component({
  moduleId: module.id,
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    NewFileComponent,
  ],
  providers:[
    MdIconRegistry,
    FileService,
    ProjectService
  ]
})
export class ProjectComponent implements OnInit {
  formShowing=false;
  project_id:string;
  files:File[];
  private errorMessage:string;
  project: Object={
    name: "",
    description: ""
  }

  constructor(private curr: RouteSegment,private _service:FileService, private router:Router, private _projectService:ProjectService ) {
    this.project_id=curr.getParam("id");
  }

  ngOnInit() {
    this.getProject();
    this.getFiles();
  }

  private getProject() {
    this._projectService.getProject(this.project_id).subscribe(
      project=>{
        this.project["name"]=project["name"];
        this.project["description"]=project["description"]
      },
      error => this.errorMessage = <any>error
    )
  }
  private getFiles() {
    this._service.getFiles(this.project_id).subscribe(
      res=>this.files=res,
      error => this.errorMessage = <any>error
    )
  }

  closeForm(file){
    this.files.push(file);
    this.formShowing=false;
  }
  deleteFile(file:File){
    this._service.deleteFile(file)
      .subscribe(
        result => {
          if(result){
            let inx = this.files.indexOf(file);
            this.files.splice(inx,1);
          }
          console.log("deleted file")
        },
        error => this.errorMessage = <any>error
      );
  }

  checkFile(file:File){
    this._service.checkFileStatus(file._id).subscribe(
      res=> {
        if(res==100){
          this.router.navigate(['/dashboard/model-viewer/'+file._id])
        }
        else{
          alert("still processing in "+res)
        }
      },
      error=>this.errorMessage=<any>error
    )
  }

}
