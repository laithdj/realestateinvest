import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { AddEditPropertyComponent } from './add-edit-property/add-edit-property.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'my-properties',
    component: MyPropertiesComponent
  },
  {
    path: 'add-property',
    component: AddEditPropertyComponent
  },
  {
    path: 'edit-property/:id',
    component: AddEditPropertyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
