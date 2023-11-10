import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { NewUserSidebarComponent } from './user-list/new-user-sidebar/new-user-sidebar.component';
import { UserListService } from './user-list/user-list.service';



const routes = [
  {
    path: 'user/add',
    component: UserAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'user/list',
    component: UserListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'user/edit',
    component: UserEditComponent,
    data: { animation: 'edit' }
  } 
];

@NgModule({
  declarations: [UserAddComponent, UserEditComponent, UserListComponent, NewUserSidebarComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    CommonModule,
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  exports: [UserAddComponent, UserEditComponent, UserListComponent],
  providers: [UserListService]
})
export class UserModule {}
