import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationListComponent } from './location-list/location-list.component';
import { LocationShowComponent } from './location-show/location-show.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationCreateComponent } from './location-create/location-create.component';

const routes: Routes = [
  {path: 'location/create', component: LocationCreateComponent },
  {path: 'location/:id', component: LocationShowComponent },
  {path: 'location/edit/:id', component: LocationEditComponent },
  {path: '', component: LocationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
