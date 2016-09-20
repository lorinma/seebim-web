import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RequestOptions, Headers, Http, Response} from "@angular/http";
import {File} from "./file";
import {Feature} from "./feature";

@Injectable()
export class FileService {
  restfulAPI="https://seebim-api-lorinma.c9users.io";
  scannerAPI="https://ls-emulator-lorinma.c9users.io";
  constructor(private _http:Http) { }
  handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  addFile(ProjectID: string, Url: string) : Observable<File> {
    let file: Object = {
      ProjectID: ProjectID,
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
      ThumbnailUrl:item['ThumbnailUrl'],
    }
  }
  getFiles(UserID: string) : Observable<File[]>  {
    return this._http.get(this.restfulAPI+'/fileList?where={"ProjectID":"'+UserID+'","Url":{"$ne":"removed"}}')
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
          ThumbnailUrl:item['ThumbnailUrl'],
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
  getViewerData(_id: string) : Observable<File>  {
    return this._http.get(this.restfulAPI+'/viewer/'+_id)
      .map(this.viewerData)
      .catch(this.handleError);
  }
  viewerData(res: Response) {
    let item = res.json();
    return {
      token:item['token'],
      TrimbleVersionID:item['TrimbleVersionID'],
      TrimbleProjectID:item['TrimbleProjectID'],
    }
  }
  getFeatures(GlobalId: string, TrimbleVersionID: string) : Observable<Feature[]> {
    return this._http.get(this.restfulAPI+'/featureVisual?where={"GlobalId":"'+GlobalId+'","TrimbleVersionID":"'+TrimbleVersionID+'"}')
      .map(this.featuresData)
      .catch(this.handleError);
  }

  private featuresData(res: Response) {
    let items = res.json()['_items'];
    return items.map(
      item=>{
        let feature={
          TrimbleVersionID:item["TrimbleVersionID"],
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

  scan(scanner: {CS_X: Object; CS_Y: Object; CS_Z: Object; CS_Origin: Object; TrimbleVersionID: string; Resolution: number}) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.scannerAPI+'/scanner',JSON.stringify(scanner),options)
      .map(this.scanData)
      .catch(this.handleError);
  }
  private scanData(res: Response){
    return res.json()['_id'];
  }
  private scansData(res: Response){
    let items = res.json()['_items'];
    return items.map(
      item=>{
        let result=item["_id"];
        return result
      }
    )
  }
  getScans(TrimbleVersionID: string) {
    return this._http.get(this.scannerAPI+'/scanner?where={"TrimbleVersionID":"'+TrimbleVersionID+'"}')
      .map(this.scansData)
      .catch(this.handleError);
  }
}
