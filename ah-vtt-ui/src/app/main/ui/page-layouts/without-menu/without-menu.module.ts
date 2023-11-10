import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

//import { DashboardModule } from 'app/main/dashboard/dashboard.module';
//import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { WithoutMenuComponent } from 'app/main/ui/page-layouts/without-menu/without-menu.component';

const routes: Routes = [
  {
    path: 'page-layouts/without-menu',
    component: WithoutMenuComponent,
    resolve: {
  //    css: DashboardService
    }
  }
];

@NgModule({
  declarations: [WithoutMenuComponent],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule, 
    //DashboardModule
  ],
  providers: [
  //  DashboardModule
  ]
})
export class WithoutMenuModule {}
