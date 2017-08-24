import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizesComponent } from './sizes/sizes.component';
import { SizeTypesComponent } from './size-types/size-types.component';
import { CrateTypesComponent } from './crate-types/crate-types.component';

const routes: Routes = [
  {
    path: '',
    component: SizesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'size-types' },
      { path: 'size-types', component: SizeTypesComponent },
      { path: 'crate-types', component: CrateTypesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizesRoutingModule { }
