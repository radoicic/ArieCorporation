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

import { TravelerAddComponent } from './traveler-add/traveler-add.component';
import { TravelerListComponent } from './traveler-list/traveler-list.component';
import { TravelerEditComponent } from './traveler-edit/traveler-edit.component';
import { NewTravelerSidebarComponent } from './traveler-list/new-traveler-sidebar/new-traveler-sidebar.component';

const routes = [
  {
    path: 'traveler/add',
    component: TravelerAddComponent,
    data: { animation: 'add' }
  },
  {
    path: 'traveler/list',
    component: TravelerListComponent,
    data: { animation: 'list' }
  },
  {
    path: 'traveler/edit',
    component: TravelerEditComponent,
    data: { animation: 'edit' }
  }
];

@NgModule({
  declarations: [TravelerAddComponent, TravelerEditComponent, TravelerListComponent, NewTravelerSidebarComponent],
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
  exports: [TravelerAddComponent, TravelerEditComponent, TravelerListComponent]
})
export class TravelerModule {}
