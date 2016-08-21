import {Routes, RouterModule} from "@angular/router";
import {ModelListComponent} from "./model-list/model-list.component";
import {ModelViewerComponent} from "./model-viewer/model-viewer.component";
import {DashboardComponent} from "./dashboard.component";
const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: ':id', component: ModelViewerComponent },
      { path: '', component: ModelListComponent }
    ]
  },
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
