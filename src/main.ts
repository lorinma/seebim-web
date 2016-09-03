import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { SeeBIMAppComponent, environment } from './app/';
import {defaultFirebase, FIREBASE_PROVIDERS} from "angularfire2";

if (environment.production) {
  enableProdMode();
}

bootstrap(SeeBIMAppComponent, [
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://CBIM.firebaseio.com')
]);

