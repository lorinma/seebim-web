import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "./project";
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ProjectService {
  restfulAPI="https://seebim-api-lorinma.c9users.io";

  constructor(private _http:Http) { }
  handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getProjects(UserID: string) : Observable<Project[]>  {
    return this._http.get(this.restfulAPI+'/project?where={"UserID":"'+UserID+'"}')
      .map(this.projectsData)
      .catch(this.handleError);
  }
  projectsData(res: Response) {
    let items = res.json()['_items'];
    return items.map(
      item=>{
        let project={
          _id: item["_id"],
          TrimbleProjectID:item['TrimbleProjectID'],
          Name:item['Name'],
          Description:item['Description'],
        };
        return project
      }
    );
  }
  addProject(newProject:Object): Observable<Project> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.restfulAPI+'/project',JSON.stringify(newProject),options)
      .map(this.projectData)
      .catch(this.handleError);
  }
  projectData(res: Response) {
    let item = res.json();
    return {
      _id:item['_id'],
      Name:item['Name'],
      Description:item['Description'],
    }
  }
  deleteProject(_id: string) {
    return this._http.get(this.restfulAPI+'/projectRemove/'+_id)
      .map(this.projectsData)
      .catch(this.handleError);
  }

}
