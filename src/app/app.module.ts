import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from "./app.routing";

import { DashboardModule } from "./dashboard/dashboard.module";

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProjectListComponent } from './dashboard/project-list/project-list.component';


@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // ProjectListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DashboardModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
