import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { StaffAddComponent } from './staff-add/staff-add.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffRolesListComponent } from './staff-roles-list/staff-roles-list.component';
import { StaffRolesAddComponent } from './staff-roles-add/staff-roles-add.component';
import { StaffRolesEditComponent } from './staff-roles-edit/staff-roles-edit.component';



const routes = [
  {
    path: 'staff/add',
    component: StaffAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'staff/list',
    component: StaffListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'staff/edit',
    component: StaffEditComponent,
    data: { animation: 'edit' }
  },
  {
    path: 'staff/roles/list',
    component: StaffRolesListComponent,
    data: { animation: 'roles-list' }
  },
  {
    path: 'staff/roles/add',
    component: StaffRolesAddComponent,
    data: { animation: 'roles-add' }
  },
  {
    path: 'staff/roles/edit',
    component: StaffRolesEditComponent,
    data: { animation: 'roles-edit' }
  }
];

@NgModule({
  declarations: [StaffAddComponent, StaffListComponent,StaffEditComponent,StaffRolesAddComponent,StaffRolesListComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [StaffAddComponent, StaffEditComponent, StaffListComponent,StaffEditComponent,StaffRolesAddComponent,StaffRolesListComponent]
})
export class StaffModule {}
