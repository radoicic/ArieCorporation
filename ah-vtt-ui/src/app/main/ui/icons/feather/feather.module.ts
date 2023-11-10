import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { FeatherComponent } from 'app/main/ui/icons/feather/feather.component';

// routing
const routes: Routes = [
  {
    path: 'icons/feather',
    component: FeatherComponent,
    data: { animation: 'feather' }
  }
];

@NgModule({
  declarations: [FeatherComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ContentHeaderModule, CoreCommonModule, NgbModule]
})
export class FeatherModule {}
