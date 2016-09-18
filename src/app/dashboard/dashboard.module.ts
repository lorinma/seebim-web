import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MdCardModule} from "@angular2-material/card";
import {MdToolbarModule} from "@angular2-material/toolbar";
import {MdButtonModule} from "@angular2-material/button";
import {MdSidenavModule} from "@angular2-material/sidenav";
import {MdListModule} from "@angular2-material/list";
import {MdIconModule} from "@angular2-material/icon";
import {MdTabsModule} from "@angular2-material/tabs";
import {MdInputModule} from "@angular2-material/input";

import {DashboardComponent} from "./dashboard.component";
import {ProjectListComponent} from "./project-list/project-list.component"; 
// import {ModelListComponent} from "./model-list/model-list.component";
// import {ModelViewerComponent} from "./model-viewer/model-viewer.component";

import { dashboardRouting } from "./dashboard.routing";

@NgModule({
  declarations: [
    DashboardComponent
    // , ModelListComponent, ModelViewerComponent
    , ProjectListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // dashboardRouting,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdTabsModule,
    MdInputModule,
  ],
  providers: [
  ],
})
export class DashboardModule {

}