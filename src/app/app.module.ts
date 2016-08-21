import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {appRoutingProviders, routing} from "./app.routing";
import { LoginComponent } from './login/login.component';
// import {MdCardModule} from "@angular2-material/card";
// import {MdToolbarModule} from "@angular2-material/toolbar";
// import {MdButtonModule} from "@angular2-material/button";
// import {MdSidenavModule} from "@angular2-material/sidenav";
// import {MdListModule} from "@angular2-material/list";
// import {MdIconModule} from "@angular2-material/icon";
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    DashboardModule,
    // MdCardModule,
    // MdToolbarModule,
    // MdButtonModule,
    // MdSidenavModule,
    // MdListModule,
    // MdIconModule,
  ],
  providers: [
    appRoutingProviders
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
