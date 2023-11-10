import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';

import { ChildAddComponent } from './child-add/child-add.component';
import { ChildListComponent } from './child-list/child-list.component';
import { ChildEditComponent } from './child-edit/child-edit.component';
import { NewChildSidebarComponent } from './child-list/new-childern-sidebar/new-children-sidebar.component';

const routes = [
  {
    path: 'child/add',
    component: ChildAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'child/list',
    component: ChildListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'child/edit',
    component: ChildEditComponent,
    data: { animation: 'edit' }
  }
];

@NgModule({
  declarations: [ChildAddComponent, ChildEditComponent, ChildListComponent, NewChildSidebarComponent],
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
    CoreSidebarModule],
  exports: [ChildAddComponent, ChildEditComponent, ChildListComponent]
})
export class ChildModule {}
