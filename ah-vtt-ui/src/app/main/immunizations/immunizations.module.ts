import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CoreSidebarModule } from '@core/components/core-sidebar/core-sidebar.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VaccineListComponent } from './vaccine-management/vaccine-list/vaccine-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VaccineAddEditComponent } from './vaccine-management/vaccine-add-edit/vaccine-add-edit.component';
import { VaccinationComponent } from './vaccination/vaccination.component';

const routes = [
  {
    path: 'immunizations/vaccine-list',
    component: VaccineListComponent,
    data: { animation: ' vaccine-inventory-list' },
  },
  {
    path: 'immunizations/vaccination', // TO-DO: Add childId, draftId params as required, refer flow draft feature
    component: VaccineListComponent,
    data: { animation: ' vaccine-inventory-list' },
  }
]

@NgModule({
  declarations: [
    VaccineListComponent,
    VaccineAddEditComponent,
    VaccinationComponent
  ],
  imports: [
    RouterModule.forChild(routes), 
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgxDatatableModule,
    CardSnippetModule,
    CsvModule,
    NgbModule,
    CoreCardModule,
    CoreSidebarModule,
    SweetAlert2Module,
    NgSelectModule
  ],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    }
  ]
})
export class ImmunizationsModule { }





