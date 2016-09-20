import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import {ProjectComponent} from "./project/project.component";
import {ModelComponent} from "./model/model.component";
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'model/:id', component: ModelComponent }
    ]
  },
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
