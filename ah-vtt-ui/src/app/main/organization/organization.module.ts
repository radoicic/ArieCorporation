import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';


const routes = [
  {
    path: 'organization/add',
    component: OrganizationAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'organization/list',
    component: OrganizationListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'organization/edit',
    component: OrganizationEditComponent,
    data: { animation: 'edit' }
  } 
];

@NgModule({
  declarations: [OrganizationAddComponent,OrganizationEditComponent,OrganizationListComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [OrganizationAddComponent,OrganizationEditComponent,OrganizationListComponent]
})
export class OrganizationModule {}
