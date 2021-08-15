import { NoConnectionComponent } from './shared/no-connection/no-connection.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "no-connection",
    component: NoConnectionComponent,
    pathMatch: "full"
  },
  {
    path: "not-found",
    component: NotFoundComponent,
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "not-found",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
