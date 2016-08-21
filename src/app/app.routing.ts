import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
export const appRoutingProviders: any[] = [
];
export const routing = RouterModule.forRoot(appRoutes);
