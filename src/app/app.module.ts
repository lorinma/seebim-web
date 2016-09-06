import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {appRoutingProviders, routing} from "./app.routing";
import { LoginComponent } from './login/login.component';
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    DashboardModule,
  ],
  providers: [
    appRoutingProviders
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
