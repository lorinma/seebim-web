import {Routes, RouterModule} from "@angular/router";
import {ModelListComponent} from "./model-list/model-list.component";
import {ModelViewerComponent} from "./model-viewer/model-viewer.component";
import {DashboardComponent} from "./dashboard.component";
import {ProjectListComponent} from "./project-list/project-list.component";
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'project/:id', component: ModelListComponent },
      { path: 'model/:id', component: ModelViewerComponent }
    ]
  },
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
