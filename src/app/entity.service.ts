import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "./user";
import {Observable} from "rxjs/Rx";
import {Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class EntityService {
  user:User;

  constructor(private _auth:AuthService) {
    this.user=this._auth.user;
  }

  getIDbyGUID(guid:string,file_id:string) : Observable<string> {
    let url=this._auth.restfulAPI+'/entity?where={"$and": [{"FileID":"'+file_id+'"},{"Attribute": {"$elemMatch":{"Value": "'+guid+'","Name": "GlobalId"}}}]}&projection={"_id":1}'
    return this._auth._http.get(url)
      .map(this.getEntityID)
      .catch(this._auth.handleError);
  }
  getEntityID(res:Response){
    let data=res.json()['_items'][0]
    return data['_id']
  }
  getEntity(_id:string,resource:string='entity'){
    let url=this._auth.restfulAPI+"/"+resource+"/"+_id;
    return this._auth._http.get(url)
      .map(this.getEntityData)
      .catch(this._auth.handleError);
  }
  getEntityData(res:Response){
    return res.json()
  }
  getEntities(resource:string='entity'){
    let url=this._auth.restfulAPI+"/"+resource;
    return this._auth._http.get(url)
      .map(this.getEntitiesData)
      .catch(this._auth.handleError);
  }
  getEntitiesData(res:Response){
    return res.json()['_items']
  }
  getEntityEtag(res:Response){
    return res.json()['_etag']
  }
  updateEntity(_id:string, _etag:string, data:Object,resource:string='entity'): Observable<string>  {
    let body=JSON.stringify(data)
    let headers = new Headers({ 'Content-Type': 'application/json','IF-Match': _etag });
    let options = new RequestOptions({ headers: headers });
    let url=this._auth.restfulAPI+'/'+resource+'/'+_id;
    return this._auth._http.patch(url,body, options)
      .map(this.getEntityEtag)
      .catch(this._auth.handleError);
  }


  deleteEntity(_id:string,_etag:string,resource:string='/entity/') {
    let headers = new Headers({ 'IF-Match': _etag});
    let options = new RequestOptions({ headers: headers });
    return this._auth._http.delete(this._auth.restfulAPI+resource+_id,options)
      .map(this._auth.booleanResponse)
      .catch(this._auth.handleError);
  }

  addEntity(data:Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._auth._http.post(this._auth.restfulAPI+'/entity',JSON.stringify(data),options)
      .map(this.getResponseData)
      .catch(this._auth.handleError);
  }
  getResponseData(res:Response){
    let data=res.json();
    return data
  }
}
