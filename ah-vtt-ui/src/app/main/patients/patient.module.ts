import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientChartComponent } from './patient-chart/patient-chart.component';

const routes = [
  {
    path: 'patient/add',
    component: PatientAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'patient/list',
    component: PatientListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'patient/edit',
    component: PatientEditComponent,
    data: { animation: 'edit' }
  },
  {
    path: 'patient/chart',
    component: PatientChartComponent,
    data: { animation: 'chart' }
  }
];

@NgModule({
  declarations: [PatientAddComponent, PatientEditComponent, PatientChartComponent, PatientListComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [PatientAddComponent, PatientEditComponent, PatientListComponent, PatientChartComponent]
})
export class PatientModule {}
