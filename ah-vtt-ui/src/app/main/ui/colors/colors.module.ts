import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ColorsComponent } from 'app/main/ui/colors/colors.component';

// routing
const routes: Routes = [
  {
    path: 'colors',
    component: ColorsComponent,
    data: { animation: 'colors' }
  }
];

@NgModule({
  declarations: [ColorsComponent],
  imports: [ContentHeaderModule, RouterModule.forChild(routes), CoreCommonModule]
})
export class ColorsModule {}
