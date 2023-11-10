import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { RegionManagementComponent } from './region-management/region-management.component';
import { RegionListComponent } from './region-list/region-list.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { RegionService } from './region.service';
import { CoreCommonModule } from '@core/common.module';
import { ValidatorService } from '@core/services/validator.service';
import { NgSelectModule } from '@ng-select/ng-select';

const routes = [
  {
    path: 'region/manage',
    component: RegionManagementComponent,
    data: { animation: 'list' }
  }
]

@NgModule({
  declarations: [
    RegionManagementComponent,
    RegionListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    CoreCommonModule,
    NgSelectModule
  ],
  providers: [
    RegionService,
    ValidatorService
  ]
})
export class RegionModule { }
