import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2/angularfire2";
import {User} from "./user";
import {Attribute} from "./+dashboard/+model-viewer/panel/attribute";

@Injectable()
export class AuthService {
  user:User
  restfulAPI="https://seebim-api-lorinma.c9users.io"
  constructor(public _http: Http,public af: AngularFire) {
  }
  handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  booleanResponse(res: Response){
    return true;
  };
  addUser(user:User): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.user=user
    return this._http.post(this.restfulAPI+'/user',JSON.stringify(user),options)
      .map(this.booleanResponse)
      .catch(this.handleError);
  }
}
