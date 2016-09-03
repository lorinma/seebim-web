import { Injectable } from '@angular/core';
import {File} from "./+project/file";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../auth.service";
import {User} from "../user";
import {Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class FileService {
  user:User
  constructor(private _auth:AuthService) {
    this.user=this._auth.user;
  }

  getFiles(project_id:string): Observable<File[]> {
    return this._auth._http.get(this._auth.restfulAPI+'/file?where={"firebase_uid":"'+this.user.firebase_uid+'","project_id":"'+project_id+'"}')
      .map(this.dataFiles)
      .catch(this._auth.handleError);
  }
  private dataFiles(res: Response) {
    let items = res.json()['_items'];
    return items.map(
      item=>{
        let file={
          _id: item["_id"],
          _etag: item["_etag"],
          project_id: item["project_id"],
          trimble_file_id: item["trimble_file_id"],
          trimble_version_id: item["trimble_version_id"],
          name: item["name"],
          description: item["description"],
          user_id: item["user_id"],
          firebase_uid: item["firebase_uid"],
          source_url: item["source_url"],
          trimble_createdOn: item["trimble_createdOn"],
          trimble_modifiedOn: item["trimble_modifiedOn"],
          trimble_project_id: item["trimble_project_id"],
          trimble_folder_id: item["trimble_folder_id"],
          trimble_token: item["trimble_token"]
        }
        return file
      }
    );
  }

  addFile(name:string, desc:string,project_id:string, file_url:string) : Observable<Object> {
    let file: Object = {
      name: name,
      description: desc,
      project_id: project_id,
      source_url: file_url,
      firebase_uid: this.user.firebase_uid
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._auth._http.post(this._auth.restfulAPI+'/file',JSON.stringify(file),options)
      .map(this.dataFile)
      .catch(this._auth.handleError);
  }

  private dataFile(res: Response) {
    let item=res.json();
    let file={
      _id: item["_id"],
      _etag: item["_etag"],
      project_id: item["project_id"],
      trimble_file_id: item["trimble_file_id"],
      trimble_version_id: item["trimble_version_id"],
      name: item["name"],
      description: item["description"],
      user_id: item["user_id"],
      firebase_uid: item["firebase_uid"],
      source_url: item["source_url"],
      trimble_createdOn: item["trimble_createdOn"],
      trimble_modifiedOn: item["trimble_modifiedOn"],
      trimble_project_id: item["trimble_project_id"],
      trimble_folder_id: item["trimble_folder_id"],
      trimble_token: item["trimble_token"]
    }
    return file;
  }

  deleteFile(file:File): Observable<boolean>{
    let headers = new Headers({ 'IF-Match': file._etag });
    let options = new RequestOptions({ headers: headers });
    return this._auth._http.delete(this._auth.restfulAPI+'/file/'+file._id,options)
      .map(this._auth.booleanResponse)
      .catch(this._auth.handleError);
  }

  checkFileStatus(file_id:string): Observable<number> {
    return this._auth._http.get(this._auth.restfulAPI + '/fileStatus/' + file_id)
      .map(this.fileStatus)
      .catch(this._auth.handleError);
  }
  
  fileStatus(res:Response){
    let data=res.json()
    let status=data['status']
    return status
  }

  getFile(file_id:string): Observable<File[]> {
    return this._auth._http.get(this._auth.restfulAPI+'/file/'+file_id)
      .map(this.dataFile)
      .catch(this._auth.handleError);
  }




}
