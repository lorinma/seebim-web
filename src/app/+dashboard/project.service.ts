import { Injectable } from '@angular/core';
import {Response, Headers, RequestOptions} from "@angular/http";
import {User} from "../user";
import {Observable} from "rxjs/Rx";
import {Project} from "./+project-list/project";
import {AuthService} from "../auth.service";

@Injectable()
export class ProjectService {
  user:User;
  constructor(private _auth:AuthService) {
    this.user=this._auth.user
  }
  getProjects(): Observable<Project[]>{
    return this._auth._http.get(this._auth.restfulAPI+'/project/?where={"firebase_uid":"'+this.user.firebase_uid+'"}')
      .map(this.dataProjects)
      .catch(this._auth.handleError);
  }
  private dataProjects(res: Response) {
    let items = res.json()['_items'];
    return items.map(
      item=>{
        let project={
          firebase_uid: item["firebase_uid"],
          _id: item["_id"],
          _etag: item["_etag"],
          name: item["name"],
          description: item["description"],
          trimble_project_id: item["trimble_project_id"],
          trimble_root_folder_id: item["trimble_root_folder_id"],
          trimble_server_region: item["trimble_server_region"],
          user_id: item["user_id"]
        }
        return project
      }
    );
  }

  addProject(newProject:Object): Observable<Project> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    newProject['firebase_uid']=this.user.firebase_uid;
    return this._auth._http.post(this._auth.restfulAPI+'/project',JSON.stringify(newProject),options)
      .map(this.dataProject)
      .catch(this._auth.handleError);
  }
  private dataProject(res: Response) {
    let item=res.json()
    return {
      firebase_uid: item["firebase_uid"],
      _id: item["_id"],
      _etag: item["_etag"],
      name: item["name"],
      description: item["description"],
      trimble_project_id: item["trimble_project_id"],
      trimble_root_folder_id: item["trimble_root_folder_id"],
      trimble_server_region: item["trimble_server_region"],
      user_id: item["user_id"]
    };
  }

  deleteProject(project:Project): Observable<boolean>{
    let headers = new Headers({ 'IF-Match': project._etag });
    let options = new RequestOptions({ headers: headers });
    return this._auth._http.delete(this._auth.restfulAPI+'/project/'+project._id,options)
      .map(this._auth.booleanResponse)
      .catch(this._auth.handleError);
  }

  getProject(project_id:string): Observable<Object> {
    return this._auth._http.get(this._auth.restfulAPI+'/project/'+project_id)
      .map(this.dataProject)
      .catch(this._auth.handleError);
  }
}
