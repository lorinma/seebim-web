import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MdCardModule} from "@angular2-material/card";
import {MdToolbarModule} from "@angular2-material/toolbar";
import {MdButtonModule} from "@angular2-material/button";
import {MdSidenavModule} from "@angular2-material/sidenav";
import {MdListModule} from "@angular2-material/list";
import {MdIconModule} from "@angular2-material/icon";
import {ModelListComponent} from "./model-list/model-list.component";
import {ModelViewerComponent} from "./model-viewer/model-viewer.component";
import {dashboardRouting} from "./dashboard.routing";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  declarations: [
    DashboardComponent, ModelListComponent, ModelViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    dashboardRouting,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
  ],
  providers: [
  ],
})
export class DashboardModule {

}
