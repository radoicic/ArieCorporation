import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { UserPermissionsListComponent } from './user-permissions-list/user-permissions-list.component';


const routes = [
  {
    path: 'user/permissions/list',
    component: UserPermissionsListComponent,
    data: { animation: 'add' }
  }
];

@NgModule({
  declarations: [UserPermissionsListComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [UserPermissionsListComponent]
})
export class UserPermissionsModule {}
