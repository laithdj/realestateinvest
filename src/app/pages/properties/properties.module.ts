import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
