import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RequestOptions, Headers, Http, Response} from "@angular/http";
import {File} from "./file";
import {Feature} from "./feature";

@Injectable()
export class FileService {
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
  addFile(UserID: string, Url: string) : Observable<File> {
    let file: Object = {
      UserID: UserID,
      Url: Url,
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.restfulAPI+'/file',JSON.stringify(file),options)
      .map(this.fileData)
      .catch(this.handleError);
  }
  fileData(res: Response) {
    let item = res.json();
    return {
      _id:item['_id'],
      TrimbleVersionID:item['TrimbleVersionID'],
      ThumbnailUrl:item['ThumbnailUrl'],
      TrimbleProjectID:item['TrimbleProjectID'],
    }
  }
  getFiles(UserID: string) : Observable<File[]>  {
    return this._http.get(this.restfulAPI+'/file?where={"UserID":"'+UserID+'"}')
      .map(this.filesData)
      .catch(this.handleError);
  }
  filesData(res: Response) {
    let items = res.json()['_items'];
    return items.map(
      item=>{
        if(!("token" in item)){
          item['token']=""
        }
        let file={
          _id: item["_id"],
          TrimbleVersionID:item['TrimbleVersionID'],
          ThumbnailUrl:item['ThumbnailUrl'],
          TrimbleProjectID:item['TrimbleProjectID'],
          token:item['token'],
        };
        return file
      }
    );
  }
  //this endpoint is used for easy patch the document
  deleteFile(_id: string) {
    return this._http.get(this.restfulAPI+'/fileRemove/'+_id)
      .map(this.fileData)
      .catch(this.handleError);
  }
  getViewerData(TrimbleVersionID: string) : Observable<File[]>  {
    return this._http.get(this.restfulAPI+'/viewer?{"TrimbleVersionID":"'+TrimbleVersionID+'"}')
      .map(this.filesData)
      .catch(this.handleError);
  }

  getFeatures(GlobalId: string, FileId: string) : Observable<Feature[]> {
    return this._http.get(this.restfulAPI+'/feature?where={"GlobalId":"'+GlobalId+'","FileId":"'+FileId+'"}')
      .map(this.featuresData)
      .catch(this.handleError);
  }

  private featuresData(res: Response) {
    let items = res.json()['_items'];
    return items.map(
      item=>{
        let feature={
          FileId:item["FileId"],
          FeatureDescription:item["FeatureDescription"],
          FeatureType:item["FeatureType"],
          FeatureName:item["FeatureName"],
          FeatureValue:item["FeatureValue"],
          FeatureProvider:item["FeatureProvider"],
          GlobalId:item["GlobalId"],
        };
        return feature
      }
    );
  }
}
