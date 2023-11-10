import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SweetAlertsComponent } from 'app/main/extensions/sweet-alerts/sweet-alerts.component';

// routing
const routes: Routes = [
  {
    path: 'sweet-alerts',
    component: SweetAlertsComponent,
    data: { animation: 'sweet-alerts' }
  }
];

@NgModule({
  declarations: [SweetAlertsComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreCommonModule,
    CardSnippetModule,
    SweetAlert2Module.forRoot()
  ]
})
export class SweetAlertsModule {}
