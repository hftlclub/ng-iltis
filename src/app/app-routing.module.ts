import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: '', redirectTo: 'event', pathMatch: 'full' },
  { path: 'event', loadChildren: './event/event.module#EventModule' },
  { path: 'management', loadChildren: './management/management.module#ManagementModule' },
  { path: 'info', component: InfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
