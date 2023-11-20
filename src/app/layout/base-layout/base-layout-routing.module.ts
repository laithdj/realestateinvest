import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: "about",
        loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path: "properties",
        loadChildren: () => import('@pages/properties/properties.module').then(m => m.PropertiesModule)
      },
      {
        path: "contact",
        loadChildren: () => import('@pages/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: "account",
        loadChildren: () => import('@pages/account/account.module').then(m => m.AccountModule)
      },
      {
        path: "profile",
        loadChildren: () => import('@pages/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseLayoutRoutingModule { }
