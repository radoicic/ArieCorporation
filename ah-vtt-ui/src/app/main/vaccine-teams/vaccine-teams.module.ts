import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { VaccineTeamAddComponent } from './vaccine-team-add/vaccine-team-add.component';
import { VaccineTeamListComponent } from './vaccine-team-list/vaccine-team-list.component';
import { VaccineTeamEditComponent } from './vaccine-team-edit/vaccine-team-edit.component';


const routes = [
  {
    path: 'vaccine-teams/add',
    component: VaccineTeamAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'vaccine-teams/list',
    component: VaccineTeamListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'vaccine-teams/edit',
    component: VaccineTeamEditComponent,
    data: { animation: 'edit' }
  } 
];

@NgModule({
  declarations: [VaccineTeamAddComponent,VaccineTeamEditComponent,VaccineTeamListComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [VaccineTeamAddComponent,VaccineTeamEditComponent,VaccineTeamListComponent]
})
export class VaccineTeamModule {}
