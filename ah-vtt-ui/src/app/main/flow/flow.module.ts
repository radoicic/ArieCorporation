import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowRegistrationComponent } from './flow-registration/flow-registration.component';
import { FlowService } from './flow.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreDirectivesModule } from '@core/directives/directives';
import { GuardianFormComponent } from './guardian-form/guardian-form.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { TravelFormComponent } from './travel-form/travel-form.component';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { ImageUploadOrCaptureModule } from '@core/components/image-upload-or-capture/image-upload-or-capture.module';


const routes = [
  {
    path: 'flow/registration/:step',
    component: FlowRegistrationComponent,
    data: { animation: 'list' }
  }
]
@NgModule({
  declarations: [
    FlowRegistrationComponent,
    GuardianFormComponent,
    ChildFormComponent,
    TravelFormComponent,
    VaccineFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    CoreCommonModule,
    CardSnippetModule,
    CoreDirectivesModule,
    NgSelectModule,
    ImageUploadOrCaptureModule
  ],
  providers: [
    FlowService
  ]
})
export class FlowModule { }
